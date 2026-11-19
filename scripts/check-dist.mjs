// Checks the built site in dist/ for copy and privacy rules a review could miss.
// Run after `astro build`; exits 1 with one line per violation.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const SITE = 'https://nelson.otazo.com.py';

// No public claim about Teuka backups until off-server backups exist.
const BACKUP_CLAIM = /backups?/i;

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith('.html') ? [path] : [];
  });
}

/** Visible text only: drops scripts, styles, comments and tags. */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ');
}

/** Resources the browser loads by itself; plain links (<a href>) are fine. */
function loadedUrls(html) {
  const urls = [];
  for (const [tag] of html.matchAll(/<(script|link|img|source|iframe|video|audio)\b[^>]*>/gi)) {
    if (/^<link\b/i.test(tag) && !/rel="(stylesheet|preload|modulepreload|icon|apple-touch-icon|manifest)"/i.test(tag)) continue;
    for (const [, url] of tag.matchAll(/\b(?:src|href)="([^"]+)"/gi)) urls.push(url);
  }
  for (const [, url] of html.matchAll(/url\(\s*['"]?([^'")]+)/gi)) urls.push(url);
  return urls;
}

const errors = [];
const files = htmlFiles(dist);

for (const file of files) {
  const page = relative(dist, file);
  const html = readFileSync(file, 'utf8');
  const text = visibleText(html);

  if (!/<html lang="(en|es)"/.test(html)) errors.push(`${page}: <html> has no en/es lang`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${page}: missing <title>`);
  if (text.includes('—')) errors.push(`${page}: em dash in visible copy`);
  if (BACKUP_CLAIM.test(text)) errors.push(`${page}: mentions backups`);
  // Astro drops the line break between a word and a link on the next source line.
  for (const [glued] of html.matchAll(/[\p{L},]<a\b/gu)) errors.push(`${page}: no space before a link (${glued})`);

  for (const url of loadedUrls(html)) {
    if (/^(https?:)?\/\//i.test(url) && !url.startsWith(SITE)) {
      errors.push(`${page}: third-party request ${url}`);
    }
  }
}

// The terminal moment lives on the two home pages only.
for (const file of files) {
  const page = relative(dist, file);
  const terminals = (readFileSync(file, 'utf8').match(/class="terminal /g) ?? []).length;
  const expected = page === 'index.html' || page === 'es.html' ? 1 : 0;
  if (terminals !== expected) errors.push(`${page}: expected ${expected} whoami terminal, found ${terminals}`);
}

// Home page structure: one terminal moment, one current role, one initial commit.
const home = readFileSync(join(dist, 'index.html'), 'utf8');
const count = (pattern) => (home.match(pattern) ?? []).length;
const expectations = [
  ['whoami terminal block', /class="terminal /g, 1],
  ['(HEAD → current) ref', /\(HEAD → current\)/g, 1],
  ['(tag: v0.1) ref', /\(tag: v0\.1\)/g, 1],
  ['// selected work section', /\/\/ selected work/g, 1],
];
for (const [label, pattern, expected] of expectations) {
  const found = count(pattern);
  if (found !== expected) errors.push(`index.html: expected ${expected} ${label}, found ${found}`);
}

// Blog: the old site's public URLs must keep answering, so every post keeps its
// slug, the listing keeps 5 posts per page, and /blog still redirects.
const read = (path) => {
  try {
    return readFileSync(join(dist, path), 'utf8');
  } catch {
    errors.push(`${path}: missing`);
    return '';
  }
};
const slugs = readdirSync(new URL('../src/content/blog/', import.meta.url))
  .filter((name) => name.endsWith('.md'))
  .map((name) => name.replace(/\.md$/, ''));
for (const slug of slugs) {
  const post = read(`blog/post/${slug}.html`);
  if (post && !post.includes('<html lang="es"')) errors.push(`blog/post/${slug}.html: not lang="es"`);
}
// Covers are the largest paint on a post: serve resized copies with fixed dimensions.
for (const slug of slugs) {
  const source = readFileSync(new URL(`../src/content/blog/${slug}.md`, import.meta.url), 'utf8');
  if (!/^img: /m.test(source)) continue;
  const cover = read(`blog/post/${slug}.html`).match(/<img\b[^>]*class="post__cover"[^>]*>/)?.[0] ?? '';
  if (!(/src="\/_astro\//.test(cover) && /width="\d+"/.test(cover) && /srcset=/.test(cover))) {
    errors.push(`blog/post/${slug}.html: cover is not an optimized, sized image`);
  }
}

const listed = [];
for (let page = 1; page <= Math.ceil(slugs.length / 5); page++) {
  const html = read(`blog/page/${page}.html`);
  const links = [...new Set([...html.matchAll(/href="\/blog\/post\/([^"]+)"/g)].map(([, slug]) => slug))];
  if (html && links.length !== Math.min(5, slugs.length - (page - 1) * 5)) {
    errors.push(`blog/page/${page}.html: lists ${links.length} posts`);
  }
  listed.push(...links);
}
if (listed.sort().join() !== [...slugs].sort().join()) errors.push('blog/page/*: listing does not cover every post once');
const rss = read('blog/rss.xml');
if (rss && (rss.match(/<item>/g) ?? []).length !== slugs.length) errors.push('blog/rss.xml: one <item> per post expected');
if (!/^\/blog\s+\/blog\/page\/1\s+301$/m.test(read('_redirects'))) errors.push('_redirects: /blog → /blog/page/1 301 missing');

// Experience CHANGELOG, in both languages: one release per job, one open-ended
// current role, and the same start dates as the home git log.
const startDates = (html, pattern) => [...html.matchAll(pattern)].map(([, date]) => date).sort();
const homeDates = startDates(home, /<time class="log__date" datetime="(\d{4}-\d{2})"/g);
for (const [page, now] of [['experience.html', 'now'], ['es/experiencia.html', 'hoy']]) {
  const html = read(page);
  if (!html) continue;
  const releaseDates = startDates(html, /<time class="release__start" datetime="(\d{4}-\d{2})"/g);
  if (homeDates.join() !== releaseDates.join()) {
    errors.push(`${page}: release dates [${releaseDates}] differ from the home git log [${homeDates}]`);
  }
  const current = (html.match(new RegExp(`→ ${now}\\]`, 'g')) ?? []).length;
  if (current !== 1) errors.push(`${page}: expected 1 "→ ${now}]" release, found ${current}`);
}

// The open-source pages list every open-source and archived project from the data.
for (const page of ['open-source.html', 'es/codigo-abierto.html']) {
  const html = read(page);
  for (const name of readdirSync(new URL('../src/content/projects/', import.meta.url))) {
    const data = readFileSync(new URL(`../src/content/projects/${name}`, import.meta.url), 'utf8');
    const project = data.match(/^name: (.+)$/m)?.[1];
    if (/^state: (open-source|archived)$/m.test(data) && html && !html.includes(`>${project}<`)) {
      errors.push(`${page}: ${project} missing`);
    }
  }
}

// Translated pages point at each other, so the language switch always has a target.
for (const [en, es] of [
  ['experience.html', 'es/experiencia.html'],
  ['open-source.html', 'es/codigo-abierto.html'],
  ['projects/teuka.html', 'es/proyectos/teuka.html'],
]) {
  const esPath = `/${es.replace(/\.html$/, '')}`;
  if (!read(en).includes(`hreflang="es" href="${SITE}${esPath}"`)) errors.push(`${en}: no hreflang link to ${esPath}`);
}

// /es/teuka is a page for prospects with no English counterpart; the case study
// is paired with its own translation instead.
const teukaEs = read('es/teuka.html');
if (/rel="alternate" hreflang=/.test(teukaEs)) errors.push('es/teuka.html: paired as a language alternate');
if (teukaEs && !teukaEs.includes('Derlis Gómez')) errors.push('es/teuka.html: must present Nelson and Derlis together');

// Spanish pages speak to Teuka prospects: "built solo" reads as "one person who may leave".
for (const page of ['es.html', 'es/teuka.html', 'es/proyectos/teuka.html']) {
  // Plain "solo" also means "only" in Spanish, so match the phrases that mean "by myself".
  if (/en solitario|por mi cuenta|una sola persona|\b(yo|él) solo\b/i.test(visibleText(read(page)))) errors.push(`${page}: presents Teuka as a solo effort`);
}


if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} problem(s) in dist/`);
  process.exit(1);
}
console.log(`ok   ${files.length} page(s) checked`);

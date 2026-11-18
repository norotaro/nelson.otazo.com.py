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

  for (const url of loadedUrls(html)) {
    if (/^(https?:)?\/\//i.test(url) && !url.startsWith(SITE)) {
      errors.push(`${page}: third-party request ${url}`);
    }
  }
}

// Home page structure: one terminal moment, one current role, one initial commit.
const home = readFileSync(join(dist, 'index.html'), 'utf8');
const count = (pattern) => (home.match(pattern) ?? []).length;
const expectations = [
  ['whoami terminal block', /class="terminal /g, 1],
  ['(HEAD → current) ref', /\(HEAD → current\)/g, 1],
  ['(tag: v0.1) ref', /\(tag: v0\.1\)/g, 1],
  ['// selected work section', /\/\/ selected work/g, 1],
  ['availability line', /open to senior remote roles/g, 1],
];
for (const [label, pattern, expected] of expectations) {
  const found = count(pattern);
  if (found !== expected) errors.push(`index.html: expected ${expected} ${label}, found ${found}`);
}

// Experience CHANGELOG: one release per job in the home git log, one open-ended
// current role, and the same start dates as the home page.
const startDates = (html, pattern) => [...html.matchAll(pattern)].map(([, date]) => date).sort();
let experience = '';
try {
  experience = readFileSync(join(dist, 'experience.html'), 'utf8');
} catch {
  errors.push('experience.html: missing');
}
if (experience) {
  const homeDates = startDates(home, /<time class="log__date" datetime="(\d{4}-\d{2})"/g);
  const releaseDates = startDates(experience, /<time class="release__start" datetime="(\d{4}-\d{2})"/g);
  if (homeDates.join() !== releaseDates.join()) {
    errors.push(`experience.html: release dates [${releaseDates}] differ from the home git log [${homeDates}]`);
  }
  const current = (experience.match(/→ now\]/g) ?? []).length;
  if (current !== 1) errors.push(`experience.html: expected 1 "→ now]" release, found ${current}`);
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

// The availability line belongs to English pages only.
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  if (html.includes('<html lang="es"') && html.includes('open to senior remote roles')) {
    errors.push(`${relative(dist, file)}: availability line on a Spanish page`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} problem(s) in dist/`);
  process.exit(1);
}
console.log(`ok   ${files.length} page(s) checked`);

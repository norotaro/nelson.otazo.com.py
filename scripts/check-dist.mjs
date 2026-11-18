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

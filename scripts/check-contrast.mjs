// Fails when a text/background token pair drops below WCAG AA (4.5:1).
// Reads the real values from src/styles/tokens.css, so a color edit is checked
// against every text/background pair the site uses.
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8');
const tokens = Object.fromEntries(
  [...css.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]),
);

function resolve(name) {
  let value = tokens[name];
  if (value === undefined) throw new Error(`Unknown token --${name}`);
  const ref = value.match(/^var\(--([\w-]+)\)$/);
  return ref ? resolve(ref[1]) : value;
}

function luminance(hex) {
  const [r, g, b] = hex
    .replace('#', '')
    .match(/../g)
    .map((c) => {
      const v = parseInt(c, 16) / 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// [text, background]
const pairs = [
  ['color-ink', 'color-paper'],
  ['color-ink', 'color-surface'],
  ['color-ink-body', 'color-surface'],
  ['color-ink-muted', 'color-surface'],
  ['color-ink-muted', 'color-paper'],
  ['color-accent', 'color-surface'],
  ['color-accent', 'color-paper'],
  ['color-accent-dark', 'color-accent-tint'],
  ['color-accent-light', 'color-ink'],
  ['color-hash', 'color-surface'],
  ['color-terminal-text', 'color-ink'],
  ['color-terminal-prompt', 'color-ink'],
  ['color-paper', 'color-ink'],
  ['chip-production-text', 'chip-production-bg'],
  ['chip-open-source-text', 'chip-open-source-bg'],
  ['chip-pending-release-text', 'chip-pending-release-bg'],
  ['chip-archived-text', 'color-surface'],
];

let failed = 0;
for (const [fg, bg] of pairs) {
  const ratio = contrast(resolve(fg), resolve(bg));
  const ok = ratio >= 4.5;
  if (!ok) failed++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${ratio.toFixed(2)}:1  --${fg} on --${bg}`);
}

if (failed) {
  console.error(`\n${failed} pair(s) below 4.5:1`);
  process.exit(1);
}

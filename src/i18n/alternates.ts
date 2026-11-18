import type { Locale } from './ui';

/*
 * Pages that are translations of each other. Pairing is explicit on purpose:
 * `/projects/teuka` (recruiters) and `/es/teuka` (Teuka prospects) carry
 * different messages for different audiences and must never be linked as
 * alternates. Spanish blog posts live at unprefixed `/blog/...` and have no pair.
 */
const PAIRS: ReadonlyArray<Record<Locale, string>> = [{ en: '/', es: '/es' }];

export type Alternate = { locale: Locale; path: string };

/** Alternates for `path`, including itself, or an empty list when unpaired. */
export function alternatesFor(path: string): Alternate[] {
  const normalized = path.length > 1 ? path.replace(/\/$/, '') : path;
  const pair = PAIRS.find((p) => Object.values(p).includes(normalized));
  if (!pair) return [];
  return (Object.entries(pair) as [Locale, string][]).map(([locale, p]) => ({ locale, path: p }));
}

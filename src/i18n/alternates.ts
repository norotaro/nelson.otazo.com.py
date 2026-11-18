import type { Locale } from './ui';

/*
 * Pages that are translations of each other. Pairing is explicit on purpose:
 * `/es/teuka` (Teuka prospects) has no English counterpart; the technical case
 * study `/projects/teuka` is paired with `/es/proyectos/teuka` instead.
 * Spanish blog posts live at unprefixed `/blog/...` and have no pair.
 */
const PAIRS: ReadonlyArray<Record<Locale, string>> = [
  { en: '/', es: '/es' },
  { en: '/experience', es: '/es/experiencia' },
  { en: '/open-source', es: '/es/codigo-abierto' },
  { en: '/projects/teuka', es: '/es/proyectos/teuka' },
];

export type Alternate = { locale: Locale; path: string };

/** Alternates for `path`, including itself, or an empty list when unpaired. */
export function alternatesFor(path: string): Alternate[] {
  const normalized = path.length > 1 ? path.replace(/\/$/, '') : path;
  const pair = PAIRS.find((p) => Object.values(p).includes(normalized));
  if (!pair) return [];
  return (Object.entries(pair) as [Locale, string][]).map(([locale, p]) => ({ locale, path: p }));
}

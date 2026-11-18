export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export const ui = {
  en: {
    'skip': 'Skip to content',
    'nav.label': 'Main',
    'footer.offTheClock':
      '// off the clock: daily chess · Ocarina of Time on the Switch 2 · the occasional soccer match',
    'footer.source': 'source',
    'lang.switch': 'Leer en español',
  },
  es: {
    'skip': 'Saltar al contenido',
    'nav.label': 'Principal',
    'footer.offTheClock':
      '// fuera del trabajo: ajedrez a diario · Ocarina of Time en la Switch 2 · algún partido de fútbol de vez en cuando',
    'footer.source': 'código',
    'lang.switch': 'Read in English',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)['en'];

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key];
}

export type NavItem = { href: string; label: string };

/* Pages that do not exist yet join these lists when their stage ships. */
export const NAV: Record<Locale, NavItem[]> = {
  en: [
    { href: '/#work', label: '/work' },
    { href: '/experience', label: '/experience' },
    { href: '/open-source', label: '/open-source' },
    { href: '/blog/page/1', label: '/blog' },
  ],
  es: [{ href: '/blog/page/1', label: '/blog' }],
};

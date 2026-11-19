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
    'home.whoami': 'husband, father & developer',
    'home.headline': 'Senior Full-Stack Engineer · Laravel · Vue',
    'home.positioning': 'I build and own production software end to end, including the AI parts.',
    'home.context': '15+ years shipping web products. Based in Asunción, Paraguay, working remotely with US teams.',
    'work.label': '// selected work',
    'work.moreArchived': 'WinterCMS plugins',
    'career.more': 'full changelog →',
    'blog.more': 'all posts →',
  },
  es: {
    'skip': 'Saltar al contenido',
    'nav.label': 'Principal',
    'footer.offTheClock':
      '// fuera del trabajo: ajedrez a diario · Ocarina of Time en la Switch 2 · algún partido de fútbol de vez en cuando',
    'footer.source': 'código',
    'lang.switch': 'Read in English',
    'home.whoami': 'esposo, padre y desarrollador',
    'home.headline': 'Ingeniero full-stack senior · Laravel · Vue',
    'home.positioning': 'Construyo y me hago cargo de software en producción de punta a punta, incluidas las partes de IA.',
    'home.context':
      'Más de 15 años creando productos web. Vivo en Asunción, Paraguay, y trabajo de forma remota con equipos de Estados Unidos.',
    'work.label': '// trabajo destacado',
    'work.moreArchived': 'plugins de WinterCMS',
    'career.more': 'changelog completo →',
    'blog.more': 'todos los artículos →',
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
  es: [
    { href: '/es/teuka', label: '/teuka' },
    { href: '/es/experiencia', label: '/experiencia' },
    { href: '/es/codigo-abierto', label: '/codigo-abierto' },
    { href: '/blog/page/1', label: '/blog' },
  ],
};

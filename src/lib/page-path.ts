/**
 * Public path of the page being rendered, as visitors see it.
 * With `build.format: 'file'`, Astro reports `/index.html` and `/es.html` at build time,
 * while the served URLs are `/` and `/es` (trailingSlash 'never').
 */
export function pagePath(url: URL): string {
  const path = url.pathname.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/$/, '');
  return path === '' ? '/' : path;
}

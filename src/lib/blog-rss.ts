import type { Locale } from '../i18n/ui';
import { blogPath, getPosts, postUrl } from './blog';

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const description = {
  en: 'Posts about web development, Laravel and PHP.',
  es: 'Artículos sobre desarrollo web, Laravel y PHP.',
};

/** The RSS feed of the posts in `lang`. */
export async function blogFeed(lang: Locale, site: URL): Promise<Response> {
  const posts = await getPosts(lang);
  const url = (path: string) => new URL(path, site).href;

  const items = posts
    .map((post) => {
      const link = url(postUrl(post));
      return `    <item>
      <title>${escape(post.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <description>${escape(post.data.description)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nelson Otazo · Blog</title>
    <link>${url(blogPath(lang))}</link>
    <atom:link href="${url(`${blogPath(lang)}/rss.xml`)}" rel="self" type="application/rss+xml" />
    <description>${description[lang]}</description>
    <language>${lang}</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}

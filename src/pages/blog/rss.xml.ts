import type { APIRoute } from 'astro';
import { getPosts, postUrl } from '../../lib/blog';

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
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
    <link>${url('/blog/page/1')}</link>
    <atom:link href="${url('/blog/rss.xml')}" rel="self" type="application/rss+xml" />
    <description>Artículos sobre desarrollo web, Laravel y PHP.</description>
    <language>es</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};

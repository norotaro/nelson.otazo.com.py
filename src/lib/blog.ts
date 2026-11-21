import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Alternate } from '../i18n/alternates';
import type { Locale } from '../i18n/ui';

export type Post = CollectionEntry<'blog'>;

/** The language folder (`en/` or `es/`) the post lives in. */
export const postLocale = (post: Post) => post.id.split('/')[0] as Locale;

export const postSlug = (post: Post) => post.id.slice(post.id.indexOf('/') + 1);

export const blogPath = (lang: Locale) => (lang === 'es' ? '/es/blog' : '/blog');

export const postUrl = (post: Post) => `${blogPath(postLocale(post))}/${postSlug(post)}`;

/** Posts in `lang`, newest first. */
export async function getPosts(lang: Locale): Promise<Post[]> {
  const posts = await getCollection('blog', (post) => postLocale(post) === lang);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** The post and its translation as language alternates, or none for an untranslated post. */
export async function postAlternates(post: Post): Promise<Alternate[]> {
  const key = post.data.translationKey;
  if (!key) return [];
  const pair = await getCollection('blog', (other) => other.data.translationKey === key);
  if (pair.length < 2) return [];
  return pair.map((entry) => ({ locale: postLocale(entry), path: postUrl(entry) }));
}

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

const covers = import.meta.glob<{ default: ImageMetadata }>('../assets/blog/*.{jpg,jpeg,png}', { eager: true });

/** The cover for a post's `img` file name, from src/assets/blog. */
export function coverFor(post: Post): ImageMetadata | undefined {
  const name = post.data.img?.toLowerCase();
  if (!name) return undefined;
  const match = Object.entries(covers).find(([path]) => path.toLowerCase().endsWith(`/${name}`));
  if (!match) throw new Error(`Cover "${post.data.img}" for ${post.id} is missing from src/assets/blog`);
  return match[1].default;
}

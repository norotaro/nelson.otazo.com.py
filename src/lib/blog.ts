import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** The old site listed 5 posts per page; `/blog/page/N` URLs depend on it. */
export const POSTS_PER_PAGE = 5;

/** All posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const postUrl = (post: Post) => `/blog/post/${post.id}`;

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/*
 * Optimizable copies of the covers. The originals stay in public/img/blog because
 * the old site linked them by URL; keep both in sync when a cover changes.
 */
const covers = import.meta.glob<{ default: ImageMetadata }>('../assets/blog/*.{jpg,jpeg,png}', { eager: true });

/** The cover for a post's `img` file name; matched case-insensitively like the old URLs. */
export function coverFor(post: Post): ImageMetadata | undefined {
  const name = post.data.img?.toLowerCase();
  if (!name) return undefined;
  const match = Object.entries(covers).find(([path]) => path.toLowerCase().endsWith(`/${name}`));
  if (!match) throw new Error(`Cover "${post.data.img}" for ${post.id} is missing from src/assets/blog`);
  return match[1].default;
}

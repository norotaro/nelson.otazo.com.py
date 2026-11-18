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

import { createHash } from 'node:crypto';
import { getCollection, type CollectionEntry } from 'astro:content';

export type Job = CollectionEntry<'experience'>['data'] & {
  id: string;
  /** Stable 7-character "commit hash" for the git log motif. */
  hash: string;
  /** `(HEAD → current)` on the current role, `(tag: v0.1)` on the first job. */
  ref?: 'current' | 'initial';
};

/** All jobs, newest first. */
export async function getJobs(): Promise<Job[]> {
  const entries = await getCollection('experience');
  const sorted = entries.sort((a, b) => b.data.start.localeCompare(a.data.start));
  const last = sorted.length - 1;
  return sorted.map((entry, index) => ({
    ...entry.data,
    id: entry.id,
    hash: createHash('sha1').update(`${entry.id}:${entry.data.start}`).digest('hex').slice(0, 7),
    ref: !entry.data.end ? 'current' : index === last ? 'initial' : undefined,
  }));
}

import { getCollection, type CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>['data'] & { id: string };

/** Featured project cards (those with an `order`) and the archived row. */
export async function getProjects(): Promise<{ featured: Project[]; archived: Project[] }> {
  const all = (await getCollection('projects')).map((entry) => ({ ...entry.data, id: entry.id }));
  return {
    featured: all
      .filter((p) => p.order !== undefined && p.state !== 'archived')
      .sort((a, b) => a.order! - b.order!),
    archived: all.filter((p) => p.state === 'archived').sort((a, b) => a.name.localeCompare(b.name)),
  };
}

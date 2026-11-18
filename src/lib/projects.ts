import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>['data'] & { id: string };

/** Featured home cards (those with an `order`), open-source projects and archived ones. */
export async function getProjects(): Promise<{ featured: Project[]; openSource: Project[]; archived: Project[] }> {
  const all = (await getCollection('projects')).map((entry) => ({ ...entry.data, id: entry.id }));
  return {
    featured: all
      .filter((p) => p.order !== undefined && p.state !== 'archived')
      .sort((a, b) => a.order! - b.order!),
    openSource: all.filter((p) => p.state === 'open-source').sort((a, b) => a.name.localeCompare(b.name)),
    archived: all.filter((p) => p.state === 'archived').sort((a, b) => a.name.localeCompare(b.name)),
  };
}

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { PROJECT_STATES } from './lib/project-state';

const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM');

/*
 * One entry per job, newest first by `start`. This is the single source for the
 * home git log, the experience CHANGELOG and the CV: dates must match on every
 * surface and are keyed by employment start.
 */
const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '*.yaml' }),
  schema: z
    .object({
      /** Name shown in the git log and CHANGELOG, e.g. `applaudo → decisionlink`. */
      name: z.string(),
      employer: z.string(),
      /** Client company for embedded engagements; omit for direct employment. */
      client: z.string().optional(),
      role: z.string(),
      roleEs: z.string(),
      location: z.string(),
      locationEs: z.string().optional(),
      start: yearMonth,
      /** Omit for the current role. */
      end: yearMonth.optional(),
      /** One-line git log message. */
      summary: z.string(),
      /** The same message for the Spanish home. */
      summaryEs: z.string(),
      added: z.array(z.string()).default([]),
      changed: z.array(z.string()).default([]),
      /** Spanish versions of `added` and `changed`, item by item. */
      addedEs: z.array(z.string()).default([]),
      changedEs: z.array(z.string()).default([]),
      /**
       * Extra detail shown on the CV only, after `added` and `changed`; the site
       * keeps its short form. English only: the CV has no Spanish version yet.
       */
      cvExtra: z.array(z.string()).default([]),
      /** Awards won in this job, shown on the CHANGELOG and the CV. */
      awards: z.array(z.string()).default([]),
      awardsEs: z.array(z.string()).default([]),
      stack: z.array(z.string()).default([]),
    })
    .refine((job) => !job.end || job.end >= job.start, {
      message: '`end` must not be before `start`',
    })
    .refine(
      (job) =>
        job.addedEs.length === job.added.length &&
        job.changedEs.length === job.changed.length &&
        job.awardsEs.length === job.awards.length,
      { message: '`addedEs`/`changedEs`/`awardsEs` must translate `added`/`changed`/`awards` item by item' },
    ),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*.yaml' }),
  schema: z.object({
    name: z.string(),
    state: z.enum(PROJECT_STATES),
    summary: z.string(),
    /** Spanish summary for the Spanish home; Teuka's must not present it as one person's work. */
    summaryEs: z.string(),
    stack: z.array(z.string()).default([]),
    url: z.url().optional(),
    /** Case study on this site; the card links here instead of `url`. */
    page: z.string().startsWith('/').optional(),
    /** Cards on the home page, ascending; archived projects are listed in one row instead. */
    order: z.number().int().optional(),
  }),
});

/*
 * Teuka customer institutions. Every entry stays `public: false` until the owner
 * agrees with Derlis and the client appears on teuka.app first.
 */
const clients = defineCollection({
  // Empty until the first client is approved; then switch to
  // glob({ base: './src/content/clients', pattern: '*.yaml' }).
  loader: async () => [],
  schema: z.object({
    name: z.string(),
    public: z.boolean().default(false),
    url: z.url().optional(),
  }),
});

/* Spanish posts migrated from the previous site; keep slugs, they are public URLs. */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    img: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { experience, projects, clients, blog };

/** `state:` chip values (BRAND.md §5, State chips). */
export const PROJECT_STATES = [
  'production',
  'current-role',
  'open-source',
  'pending-release',
  'archived',
] as const;

export type ProjectState = (typeof PROJECT_STATES)[number];

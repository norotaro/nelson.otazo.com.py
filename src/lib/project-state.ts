/** `state:` chip values; each has its own colors in src/styles/tokens.css. */
export const PROJECT_STATES = [
  'production',
  'current-role',
  'open-source',
  'pending-release',
  'archived',
] as const;

export type ProjectState = (typeof PROJECT_STATES)[number];

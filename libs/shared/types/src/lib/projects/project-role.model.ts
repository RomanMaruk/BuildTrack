export const PROJECT_ROLES = ['owner', 'admin', 'editor', 'accountant', 'viewer'] as const;

export type ProjectRoleType = (typeof PROJECT_ROLES)[number];

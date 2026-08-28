export const USER_ROLES = ['user', 'admin', 'manager', 'supervisor', 'accountant'] as const;

export type UserRoleType = (typeof USER_ROLES)[number];

export const DEFAULT_USER_ROLE: UserRoleType = 'user';

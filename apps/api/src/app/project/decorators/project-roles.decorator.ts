import { SetMetadata } from '@nestjs/common';
import { ProjectRoleType } from '@build-track/types';

export const PROJECT_ROLES_KEY = 'projectRoles';

export const ProjectRoles = (...roles: ProjectRoleType[]) => SetMetadata(PROJECT_ROLES_KEY, roles);

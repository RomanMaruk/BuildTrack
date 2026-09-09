import { PROJECT_ROLES, ProjectRoleType } from '@build-track/types';
import { IsIn } from 'class-validator';

export class UpdateMemberRoleDto {
  @IsIn(PROJECT_ROLES)
  role: ProjectRoleType;
}

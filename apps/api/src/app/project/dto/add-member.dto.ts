import { PROJECT_ROLES, ProjectRoleType } from '@build-track/types';
import { IsEmail, IsIn } from 'class-validator';

export class AddMemberDto {
  @IsEmail()
  email: string;

  @IsIn(PROJECT_ROLES)
  role: ProjectRoleType;
}

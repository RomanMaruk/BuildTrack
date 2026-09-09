import { ProjectRoleType } from './project-role.model';

export interface ICreateProject {
  name: string;
  address: string;
  baseCurrency: string;
}

export interface IProjectData extends ICreateProject {
  id: string;
  ownerId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProjectMemberData {
  id: string;
  projectId: string;
  userId: string;
  role: ProjectRoleType;
  createdAt: Date;
}

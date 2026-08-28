import { UserRoleType } from './user-roles.model';

export interface IUserRegister {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  role: UserRoleType;
  img?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserData extends IUserRegister {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

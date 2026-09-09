import { UserRoleType } from '@build-track/types';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  role: UserRoleType;
}

export interface AuthRequest extends Request {
  user: AuthUser;
}

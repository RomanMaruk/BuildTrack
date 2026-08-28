import { UserRoleType } from "./user-roles.model";

export interface IUser { 
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    role: UserRoleType;
}
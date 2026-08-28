import { IUserData } from "../users/user.model";


export interface IAuthResponse {
  accessToken: string;
  user: IUserData;
}

export interface ILoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}
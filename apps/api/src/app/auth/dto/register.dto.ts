import { IsBase64, IsEmail, IsIn, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRoleType, DEFAULT_USER_ROLE, USER_ROLES } from '@build-track/types';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsIn(USER_ROLES)
  @IsNotEmpty()
  role: UserRoleType = DEFAULT_USER_ROLE;
}

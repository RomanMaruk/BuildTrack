import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleType, USER_ROLES, DEFAULT_USER_ROLE } from '@build-track/types';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: USER_ROLES, default: DEFAULT_USER_ROLE })
  role: UserRoleType;
}

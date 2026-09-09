import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PROJECT_ROLES, ProjectRoleType } from '@build-track/types';
import { User } from '../../user/entities/user.entity';
import { Project } from './project.entity';

@Entity({ name: 'project_members' })
@Unique(['projectId', 'userId'])
export class ProjectMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @Column({ type: 'enum', enum: PROJECT_ROLES })
  role: ProjectRoleType;

  @CreateDateColumn()
  createdAt: Date;
}

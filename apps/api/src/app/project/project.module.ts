import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectRolesGuard } from './guards/project-roles.guard';
import { Project } from './entities/project.entity';
import { ProjectMember } from './entities/project-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectMember]), UserModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRolesGuard],
  exports: [ProjectService, ProjectRolesGuard],
})
export class ProjectModule {}

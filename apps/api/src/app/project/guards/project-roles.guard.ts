import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reflector } from '@nestjs/core';
import { Repository } from 'typeorm';
import { ProjectRoleType } from '@build-track/types';
import { ProjectMember } from '../entities/project-member.entity';
import { PROJECT_ROLES_KEY } from '../decorators/project-roles.decorator';

@Injectable()
export class ProjectRolesGuard implements CanActivate {
  constructor(
    @InjectRepository(ProjectMember) private readonly projectMemberRepository: Repository<ProjectMember>,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ProjectRoleType[]>(PROJECT_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const req = context.switchToHttp().getRequest();
    const userId: string | undefined = req.user?.id;
    const projectId: string | undefined = req.params?.projectId;

    if (!userId || !projectId) {
      throw new ForbiddenException('Project membership is required');
    }

    const membership = await this.projectMemberRepository.findOne({ where: { userId, projectId } });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this project');
    }

    if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.includes(membership.role)) {
      throw new ForbiddenException('Insufficient role for this action');
    }

    req.projectMember = membership;
    return true;
  }
}

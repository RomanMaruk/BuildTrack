import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectRoleType } from '@build-track/types';
import { UserService } from '../user/user.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { Project } from './entities/project.entity';
import { ProjectMember } from './entities/project-member.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectMember) private readonly projectMemberRepository: Repository<ProjectMember>,
    private readonly userService: UserService,
  ) {}

  async create(ownerId: string, dto: CreateProjectDto) {
    const project = await this.projectRepository.save(this.projectRepository.create({ ...dto, ownerId }));

    await this.projectMemberRepository.save(
      this.projectMemberRepository.create({ projectId: project.id, userId: ownerId, role: 'owner' }),
    );

    return project;
  }

  async findAllForUser(userId: string) {
    return this.projectRepository
      .createQueryBuilder('project')
      .innerJoin(ProjectMember, 'member', 'member.projectId = project.id')
      .where('member.userId = :userId', { userId })
      .getMany();
  }

  async findOne(projectId: string) {
    const project = await this.projectRepository.findOne({ where: { id: projectId } });
    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }
    return project;
  }

  async update(projectId: string, dto: UpdateProjectDto) {
    await this.findOne(projectId);
    await this.projectRepository.update(projectId, dto);
    return this.findOne(projectId);
  }

  async remove(projectId: string) {
    const project = await this.findOne(projectId);
    await this.projectRepository.remove(project);
    return project;
  }

  async listMembers(projectId: string) {
    return this.projectMemberRepository.find({ where: { projectId } });
  }

  async addMember(projectId: string, dto: AddMemberDto) {
    await this.findOne(projectId);
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new NotFoundException(`User with email ${dto.email} not found`);
    }

    const existing = await this.projectMemberRepository.findOne({ where: { projectId, userId: user.id } });
    if (existing) {
      throw new ForbiddenException('User is already a member of this project');
    }

    return this.projectMemberRepository.save(
      this.projectMemberRepository.create({ projectId, userId: user.id, role: dto.role }),
    );
  }

  async updateMemberRole(projectId: string, userId: string, role: ProjectRoleType) {
    const membership = await this.projectMemberRepository.findOne({ where: { projectId, userId } });
    if (!membership) {
      throw new NotFoundException('Membership not found');
    }

    await this.projectMemberRepository.update(membership.id, { role });
    return this.projectMemberRepository.findOne({ where: { id: membership.id } });
  }

  async removeMember(projectId: string, userId: string) {
    const membership = await this.projectMemberRepository.findOne({ where: { projectId, userId } });
    if (!membership) {
      throw new NotFoundException('Membership not found');
    }

    if (membership.role === 'owner') {
      throw new ForbiddenException('Cannot remove the project owner');
    }

    await this.projectMemberRepository.remove(membership);
    return membership;
  }
}

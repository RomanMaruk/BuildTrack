import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';
import { ProjectRolesGuard } from './guards/project-roles.guard';
import { ProjectRoles } from './decorators/project-roles.decorator';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { UpdateMemberRoleDto } from './dto/update-member-role.dto';
import { AuthRequest, AuthUser } from '../auth/types/auth-user';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@CurrentUser() { id }: AuthUser, @Body() dto: CreateProjectDto) {
    if (!id) {
      throw new BadRequestException('User not authenticated');
    }
    return this.projectService.create(id, dto);
  }

  @Get()
  findAllForUser(@CurrentUser() { id }: AuthUser) {
    return this.projectService.findAllForUser(id);
  }

  @UseGuards(ProjectRolesGuard)
  @Get(':projectId')
  findOne(@Param('projectId') projectId: string) {
    return this.projectService.findOne(projectId);
  }

  @UseGuards(ProjectRolesGuard)
  @ProjectRoles('owner', 'admin')
  @Patch(':projectId')
  update(@Param('projectId') projectId: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.update(projectId, dto);
  }

  @UseGuards(ProjectRolesGuard)
  @ProjectRoles('owner')
  @Delete(':projectId')
  remove(@Param('projectId') projectId: string) {
    return this.projectService.remove(projectId);
  }

  @UseGuards(ProjectRolesGuard)
  @Get(':projectId/members')
  listMembers(@Param('projectId') projectId: string) {
    return this.projectService.listMembers(projectId);
  }

  @UseGuards(ProjectRolesGuard)
  @ProjectRoles('owner', 'admin')
  @Post(':projectId/members')
  addMember(@Param('projectId') projectId: string, @Body() dto: AddMemberDto) {
    return this.projectService.addMember(projectId, dto);
  }

  @UseGuards(ProjectRolesGuard)
  @ProjectRoles('owner', 'admin')
  @Patch(':projectId/members/:userId')
  updateMemberRole(
    @Param('projectId') projectId: string,
    @Param('userId') userId: string,
    @Body() dto: UpdateMemberRoleDto,
  ) {
    return this.projectService.updateMemberRole(projectId, userId, dto.role);
  }

  @UseGuards(ProjectRolesGuard)
  @ProjectRoles('owner', 'admin')
  @Delete(':projectId/members/:userId')
  removeMember(@Param('projectId') projectId: string, @Param('userId') userId: string) {
    return this.projectService.removeMember(projectId, userId);
  }
}

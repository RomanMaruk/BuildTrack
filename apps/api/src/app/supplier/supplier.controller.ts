import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectRolesGuard } from '../project/guards/project-roles.guard';
import { ProjectRoles } from '../project/decorators/project-roles.decorator';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@UseGuards(JwtAuthGuard, ProjectRolesGuard)
@Controller('project/:projectId/suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @ProjectRoles('owner', 'admin')
  @Post()
  create(@Param('projectId') projectId: string, @Body() dto: CreateSupplierDto) {
    return this.supplierService.create(projectId, dto);
  }

  @Get()
  findAllForProject(@Param('projectId') projectId: string) {
    return this.supplierService.findAllForProject(projectId);
  }

  @Get(':id')
  findOne(@Param('projectId') projectId: string, @Param('id') id: string) {
    return this.supplierService.findOne(id, projectId);
  }

  @ProjectRoles('owner', 'admin')
  @Patch(':id')
  update(@Param('projectId') projectId: string, @Param('id') id: string, @Body() dto: UpdateSupplierDto) {
    return this.supplierService.update(id, projectId, dto);
  }

  @ProjectRoles('owner', 'admin')
  @Delete(':id')
  remove(@Param('projectId') projectId: string, @Param('id') id: string) {
    return this.supplierService.remove(id, projectId);
  }
}

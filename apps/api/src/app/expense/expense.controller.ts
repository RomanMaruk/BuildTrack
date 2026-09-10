import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectRolesGuard } from '../project/guards/project-roles.guard';
import { ProjectRoles } from '../project/decorators/project-roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthUser } from '../auth/types/auth-user';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@UseGuards(JwtAuthGuard, ProjectRolesGuard)
@Controller('project/:projectId/expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Param('projectId') projectId: string, @CurrentUser() user: AuthUser, @Body() dto: CreateExpenseDto) {
    return this.expenseService.create(projectId, user.id, dto);
  }

  @Get()
  findAllForProject(
    @Param('projectId') projectId: string,
    @Query('categoryId') categoryId?: string,
    @Query('supplierId') supplierId?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const filters = {
      categoryId: categoryId || undefined,
      supplierId: supplierId || undefined,
      dateFrom: dateFrom ? new Date(dateFrom) : undefined,
      dateTo: dateTo ? new Date(dateTo) : undefined,
    };
    return this.expenseService.findAllForProject(projectId, filters);
  }

  @Get(':id')
  findOne(@Param('projectId') projectId: string, @Param('id') id: string) {
    return this.expenseService.findOne(id, projectId);
  }

  @Patch(':id')
  async update(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateExpenseDto,
  ) {
    return this.expenseService.update(id, projectId, user.id, dto);
  }

  @ProjectRoles('owner', 'admin')
  @Delete(':id')
  remove(@Param('projectId') projectId: string, @Param('id') id: string) {
    return this.expenseService.remove(id, projectId);
  }
}

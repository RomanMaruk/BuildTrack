import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthRequest, AuthUser } from '../auth/types/auth-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@CurrentUser() req: AuthUser, @Body() dto: CreateCategoryDto) {
    return this.categoryService.create(req.id, dto);
  }

  @Get()
  findAllForOwner(@CurrentUser() req: AuthUser) {
    return this.categoryService.findAllForOwner(req.id);
  }

  @Get(':id')
  findOne(@CurrentUser() req: AuthUser, @Param('id') id: string) {
    return this.categoryService.findOne(id, req.id);
  }

  @Patch(':id')
  update(@CurrentUser() req: AuthUser, @Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, req.id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() req: AuthUser, @Param('id') id: string) {
    return this.categoryService.remove(id, req.id);
  }
}

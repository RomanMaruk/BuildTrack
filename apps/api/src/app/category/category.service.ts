import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

  private async assertOwnedParent(parentId: string, ownerId: string) {
    const parent = await this.categoryRepository.findOne({ where: { id: parentId } });
    if (!parent) {
      throw new NotFoundException(`Category with id ${parentId} not found`);
    }
    if (parent.ownerId !== ownerId) {
      throw new ForbiddenException('Parent category belongs to another owner');
    }
    return parent;
  }

  private async assertNoCycle(categoryId: string, newParentId: string) {
    if (newParentId === categoryId) {
      throw new ConflictException('A category cannot be its own parent');
    }

    let current: Category | null = await this.categoryRepository.findOne({ where: { id: newParentId } });
    while (current?.parentId) {
      if (current.parentId === categoryId) {
        throw new ConflictException('Cannot move a category under its own descendant');
      }
      current = await this.categoryRepository.findOne({ where: { id: current.parentId } });
    }
  }

  async create(ownerId: string, dto: CreateCategoryDto) {
    if (dto.parentId) {
      await this.assertOwnedParent(dto.parentId, ownerId);
    }

    const existingCategory = await this.categoryRepository.findOne({
      where: { ownerId, name: dto.name },
    });
    if (existingCategory) {
      throw new ConflictException('A category with this name already exists for this owner');
    }

    return this.categoryRepository.save(this.categoryRepository.create({ ...dto, ownerId }));
  }

  async findAllForOwner(ownerId: string) {
    return this.categoryRepository.find({ where: { ownerId }, order: { name: 'ASC' } });
  }

  async findOne(id: string, ownerId: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category || category.ownerId !== ownerId) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: string, ownerId: string, dto: UpdateCategoryDto) {
    await this.findOne(id, ownerId);

    if (dto.parentId) {
      await this.assertOwnedParent(dto.parentId, ownerId);
      await this.assertNoCycle(id, dto.parentId);
    }

    if (dto.name) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { ownerId, name: dto.name },
      });
      if (existingCategory && existingCategory.id !== id) {
        throw new ConflictException('A category with this name already exists for this owner');
      }
    }

    await this.categoryRepository.update(id, dto);
    return this.findOne(id, ownerId);
  }

  async remove(id: string, ownerId: string) {
    const category = await this.findOne(id, ownerId);

    const childrenCount = await this.categoryRepository.count({ where: { parentId: id } });
    if (childrenCount > 0) {
      throw new ConflictException('Delete or move child categories before deleting this category');
    }

    await this.categoryRepository.remove(category);
    return category;
  }
}

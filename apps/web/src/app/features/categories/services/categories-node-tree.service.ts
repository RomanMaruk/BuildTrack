import { inject, linkedSignal, Service } from '@angular/core';
import { TreeNode } from '@openng/optimus-ui/api';
import { ICategoryTree } from '../models/categories.model';
import { ApiCategoryService } from './api-category.service';

@Service()
export class CategoriesNodeTreeService {
  private categoryService = inject(ApiCategoryService);

  public categoriesTreeByResource = this.categoryService.getCategoryTreeByResource();
  public categoriesTree = linkedSignal(() => {
    const categories = this.categoriesTreeByResource.value();
    return this.categoriesToTreeNodes(categories) || [];
  });

  categoriesToTreeNodes(
    categories: ICategoryTree[] = [],
  ): TreeNode<ICategoryTree>[] {
    return categories.map((category) => ({
      key: category.id,
      label: category.name,
      data: category,
      children: category.children.length
        ? this.categoriesToTreeNodes(category.children)
        : [],
      expanded: true,
      styleClass: 'category-node position-relative',
    }));
  }
}


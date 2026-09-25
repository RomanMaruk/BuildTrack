import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeNode } from '@openng/optimus-ui/api';
import { AutoCompleteModule } from '@openng/optimus-ui/autocomplete';
import { Button } from '@openng/optimus-ui/button';
import { DynamicDialogConfig, DynamicDialogRef } from '@openng/optimus-ui/dynamicdialog';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TreeSelectModule } from '@openng/optimus-ui/treeselect';
import { ICategory, ICategoryPost, ICategoryTree } from '../../models/categories.model';
import { ApiCategoryService } from '../../services/api-category.service';
import { CategoriesNodeTreeService } from '../../services/categories-node-tree.service';

@Component({
  selector: 'app-form-category',
  imports: [AutoCompleteModule, FormsModule, InputTextModule, TreeSelectModule, Button],
  templateUrl: './form-category.component.html',
  styleUrl: './form-category.component.scss',
})
export class FormCategoryComponent {
  filterText = signal('');
  newCategoryName = computed(() => this.filterText().trim());
  subCategory = '';

  private categoryNodeTree = inject(CategoriesNodeTreeService);
  private categoryApi = inject(ApiCategoryService);
  public dialogRef = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);
  public categories = this.categoryNodeTree.categoriesTree;
  public readonly editingCategory: ICategory | undefined = this.dialogConfig.data?.category;

  value: string | TreeNode<ICategoryTree> | null = this.editingCategory?.name || null;

  createCategory() {
    if (typeof this.value === 'object' && this.value !== null && this.subCategory.trim() !== '') {
      const newCategory: ICategoryPost = { name: this.subCategory.trim(), parentId: this.value.key };
      this.categoryApi.createCategory(newCategory).subscribe({
        next: () => {
          this.value = null;
          this.subCategory = '';
          this.categoryNodeTree.categoriesTreeByResource.reload();
        },
        error: (err) => {
          console.error('Failed to create sub-category', err);
        },
      });
    }
  }

  updateCategory() {
    if (this.editingCategory && typeof this.value === 'string' && this.value.trim() !== '') {
      this.categoryApi.updateCategory(this.editingCategory.id, { name: this.value.trim() }).subscribe({
        next: () => {
          this.value = null;
          this.categoryNodeTree.categoriesTreeByResource.reload();
          this.dialogRef.close(true)
        },
        error: (err) => console.error('Failed to update category', err),
      });
    }
  }

  createNewCategory(name: string) {
    if (typeof name === 'string' && name.trim() !== '') {
      const newCategory: ICategoryPost = { name: name.trim() };
      this.categoryApi.createCategory(newCategory).subscribe({
        next: () => {
          this.value = null;
          this.categoryNodeTree.categoriesTreeByResource.reload();
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Failed to create category', err);
        },
      });
    } else {
      console.error('Invalid category name');
    }
  }

  onFilterInput(event: Event): void {
    const target = event.target;

    if (target instanceof HTMLInputElement) {
      this.filterText.set(target.value);
    }
  }
}

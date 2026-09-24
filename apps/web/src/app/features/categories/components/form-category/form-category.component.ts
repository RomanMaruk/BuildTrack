import { Component, computed, inject, OnInit } from '@angular/core';
import { AutoCompleteModule } from '@openng/optimus-ui/autocomplete';
import type { AutoCompleteCompleteEvent } from '@openng/optimus-ui/autocomplete';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { DynamicDialogRef } from '@openng/optimus-ui/dynamicdialog';
import { DynamicDialogConfig } from '@openng/optimus-ui/dynamicdialog';
import { CategoryStoreService } from '../../services/category-store.service';
import { ICategory, ICategoryPost } from '../../models/categories.model';
import { ApiCategoryService } from '../../services/api-category.service';

@Component({
  selector: 'app-form-category',
  imports: [AutoCompleteModule, FormsModule, InputTextModule],
  templateUrl: './form-category.component.html',
  styleUrl: './form-category.component.scss',
})
export class FormCategoryComponent implements OnInit {
  value: string | ICategory | null = null;
  subCategory = '';

  private categoryStore = inject(CategoryStoreService);
  private categoryApi = inject(ApiCategoryService);
  private dialogRef = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);
  private categoriesObject = this.categoryStore.getCategories();
  public categories = computed(() => this.categoriesObject());
  public readonly editingCategory: ICategory | undefined = this.dialogConfig.data?.category;

  search(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.categories = computed(() => {
      const categories = this.categoriesObject();
      return categories.filter((obj) => obj.name.toLowerCase().includes(query));
    });
  }

  ngOnInit() {
    if (this.editingCategory) {
      this.value = this.editingCategory.name;
    }
  }

  createCategory() {
    if (this.editingCategory && typeof this.value === 'string' && this.value.trim() !== '') {
      this.categoryApi.updateCategory(this.editingCategory.id, { name: this.value.trim() }).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Failed to update category', err),
      });
      return;
    }

    if (typeof this.value === 'string' && this.value.trim() !== '') {
      const newCategory: ICategoryPost = { name: this.value.trim() };
      this.categoryApi.createCategory(newCategory).subscribe({
        next: (category) => {
          this.categoryStore.addCategory(category);
          this.value = null;
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Failed to create category', err);
        },
      });
    } else if (typeof this.value === 'object' && this.value !== null && this.subCategory.trim() !== '') {
      const newCategory: ICategoryPost = { name: this.subCategory.trim(), parentId: this.value.id };
      this.categoryApi.createCategory(newCategory).subscribe({
        next: (category) => {
          this.categoryStore.addCategory(category);
          this.value = null;
          this.subCategory = '';
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Failed to create sub-category', err);
        },
      });
    }
  }
}

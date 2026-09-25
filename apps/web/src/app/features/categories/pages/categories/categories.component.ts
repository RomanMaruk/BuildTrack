import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '@openng/optimus-ui/card';
import { TreeNode } from '@openng/optimus-ui/api';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { DialogService } from '@openng/optimus-ui/dynamicdialog';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TreeModule } from '@openng/optimus-ui/tree';
import { FormCategoryComponent } from '../../components/form-category/form-category.component';
import { ICategoryTree } from '../../models/categories.model';
import { ApiCategoryService } from '../../services/api-category.service';
import { CategoriesNodeTreeService } from '../../services/categories-node-tree.service';
@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule, DialogModule, ButtonModule, InputTextModule, TreeModule, TitleCasePipe, CardModule],
  providers: [DialogService],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {

  private categoryService = inject(ApiCategoryService);
  private categoryTreeNodes = inject(CategoriesNodeTreeService);
  private dialog = inject(DialogService);



  public categoriesTreeByResource = this.categoryTreeNodes.categoriesTreeByResource;
  public categoriesTree = this.categoryTreeNodes.categoriesTree;

  trigger() {
    this.categoryTreeNodes.categoriesTreeByResource.reload();
  }

  addCategory() {
    this.dialog.open(FormCategoryComponent, {
      header: 'Add Category',
      closable: true,
      width: '50vw',
      height: '600px',
    });
  }


  expandAll() {
    this.categoryTreeNodes.categoriesTree.update((nodes) => nodes.map((node) => this.expandRecursive(node, true)));
  }

  collapseAll() {
    this.categoryTreeNodes.categoriesTree.update((nodes) => nodes.map((node) => this.expandRecursive(node, false)));
  }

  // Returns a new node (and new nested children) instead of mutating in place,
  // so the OnPush tree nodes detect the input change and re-render.
  private expandRecursive(node: TreeNode<ICategoryTree>, expand: boolean): TreeNode<ICategoryTree> {
    return {
      ...node,
      expanded: expand,
      children: node.children?.map((child) => this.expandRecursive(child, expand)),
    };
  }

  editButton(event: TreeNode<ICategoryTree>) {
    this.dialog.open(FormCategoryComponent, {
      header: 'Edit Category',
      closable: true,
      width: '50vw',
      height: '600px',
      data: {
        category: event.data,
      },
    });
  }

  deleteButton(id: string) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.trigger();
      },
      error: (err) => {
        console.error('Error deleting category:', err);
      },
    });
  }

}



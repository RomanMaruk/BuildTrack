import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeNode } from '@openng/optimus-ui/api';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { DialogService } from '@openng/optimus-ui/dynamicdialog';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { TreeModule } from '@openng/optimus-ui/tree';
import { FormCategoryComponent } from '../../components/form-category/form-category.component';
import { ICategoryTree } from '../../models/categories.model';
import { CategoryStoreService } from '../../services/category-store.service';
import { ApiCategoryService } from '../../services/api-category.service';
@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule, DialogModule, ButtonModule, InputTextModule, TreeModule],
  providers: [DialogService],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  private categoryService = inject(ApiCategoryService);
  private categoryStore = inject(CategoryStoreService);
  private dialog = inject(DialogService);

  public categories = this.categoryStore.getCategories();
  public categoriesTree = signal<TreeNode[]>([]);

  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categoryStore.setCategories(categories);
    });
    this.categoryService.getCategoriesTree().subscribe((categoriesTree) => {
      const treeNodes: TreeNode[] = categoriesTree.map((node) => this.toTreeNode(node));
      this.categoriesTree.set(treeNodes);
    });
  }

  private toTreeNode(node: ICategoryTree): TreeNode {
    return {
      key: node.id,
      label: node.name,
      data: node,
      children: (node.children || []).map((child) => this.toTreeNode(child)),
      expanded: true,
      styleClass: 'category-node position-relative',
    };
  }

  addCategory() {
    const dialogRef = this.dialog.open(FormCategoryComponent, {
      header: 'Add Category',
      closable: true,
      width: '40vw',
      height: '500px',
    });

    dialogRef?.onClose.subscribe((result) => {
      console.log(result);
    });
  }


  expandAll() {
    const updatedFiles = this.categoriesTree().map((node) => this.expandRecursive(node, true));
    this.categoriesTree.set(updatedFiles);
  }

  collapseAll() {
    const updatedFiles = this.categoriesTree().map((node) => this.expandRecursive(node, false));
    this.categoriesTree.set(updatedFiles);
  }

  // Returns a new node (and new nested children) instead of mutating in place,
  // so the OnPush tree nodes detect the input change and re-render.
  private expandRecursive(node: TreeNode, expand: boolean): TreeNode {
    return {
      ...node,
      expanded: expand,
      children: node.children?.map((child) => this.expandRecursive(child, expand)),
    };
  }

  editButton(event: unknown) {
    console.log('Edit button clicked for node:', event);
  }

  deleteButton(event: unknown) {
    console.log('Delete button clicked for node:', event);
  }

}

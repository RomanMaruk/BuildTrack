import { Component, inject, OnInit, signal } from '@angular/core';
import { TreeModule } from '@openng/optimus-ui/tree';
import { CategoryService } from '../../services/category.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule, Dialog } from '@openng/optimus-ui/dialog';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { DialogService } from '@openng/optimus-ui/dynamicdialog';
import { FormCategoryComponent } from '../../components/form-category/form-category.component';
import { CategoryStoreService } from '../../services/category-store.service';
import { TreeNode } from '@openng/optimus-ui/api';
import { ICategoryTree } from '../../models/categories.model';
@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule, DialogModule, ButtonModule, InputTextModule, TreeModule],
  providers: [DialogService],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);
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
      styleClass: 'category-node',
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
}

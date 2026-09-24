import { Service, signal } from '@angular/core';
import type { ICategory } from '../models/categories.model';

@Service()
export class CategoryStoreService {
  private readonly categoriesSet = signal<Set<ICategory>>(new Set());
  private categoriesSetComputed = this.categoriesSet.asReadonly();

  private categories = signal<ICategory[]>([]);
  private categoriesComputed = this.categories.asReadonly();

  public getCategories() {
    return this.categoriesComputed;
  }

  public getCategoriesSet() {
    return this.categoriesSetComputed;
  }

  public setCategories(categories: ICategory[]) {
    this.categories.set(categories);
    this.categoriesSet.set(new Set(categories));
  }
  public addCategory(category: ICategory) {
    this.categories.update((categories) => [...categories, category]);
    this.categoriesSet.update((categoriesSet) => new Set(categoriesSet).add(category));
  }

  public removeCategory(id: string) {
    this.categories.update((categories) => categories.filter((category) => category.id !== id));
    this.categoriesSet.update((categoriesSet) => {
      const newSet = new Set(categoriesSet);
      for (const category of newSet) {
        if (category.id === id) {
          newSet.delete(category);
          break;
        }
      }
      return newSet;
    });
  }
}

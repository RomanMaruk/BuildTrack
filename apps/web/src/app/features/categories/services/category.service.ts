import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ICategory, ICategoryPost, ICategoryTree } from '../models/categories.model';

@Service()
export class CategoryService {
  private readonly apiUrl = environment.apiUrl;
  private readonly categoriesEndpoint = `${this.apiUrl}/api/category`;

  private api = inject(HttpClient);

  public getCategories() {
    return this.api.get<ICategory[]>(this.categoriesEndpoint);
  }
  public getCategoriesTree() {
    return this.api.get<ICategoryTree[]>(`${this.categoriesEndpoint}/tree`);
  }

  public getCategoryById(id: string) {
    return this.api.get<ICategory>(`${this.categoriesEndpoint}/${id}`);
  }

  public createCategory(category: ICategoryPost) {
    return this.api.post<ICategory>(this.categoriesEndpoint, category);
  }

  public updateCategory(id: string, category: ICategoryPost) {
    return this.api.patch<ICategory>(`${this.categoriesEndpoint}/${id}`, category);
  }

  public deleteCategory(id: string) {
    return this.api.delete<ICategory>(`${this.categoriesEndpoint}/${id}`);
  }
}

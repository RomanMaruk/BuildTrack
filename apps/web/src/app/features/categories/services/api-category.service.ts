import { Service, inject, resource, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ICategory, ICategoryPost, ICategoryTree } from '../models/categories.model';
import { firstValueFrom } from 'rxjs';

@Service()
export class ApiCategoryService {
  private readonly apiUrl = environment.apiUrl;
  private readonly categoriesEndpoint = `${this.apiUrl}/api/category`;

  private http = inject(HttpClient);

  public getCategories() {
    return this.http.get<ICategory[]>(this.categoriesEndpoint);
  }

  private trigger = signal({});
  public getCategoryTreeByResource() {
    const resouce = resource({
      params: () => this.trigger(),
      loader: async () => await firstValueFrom(
        this.http.get<ICategoryTree[]>(`${this.categoriesEndpoint}/tree`),
      )
    });
    return resouce;
  }

  public getCategoriesTree() {
    return this.http.get<ICategoryTree[]>(`${this.categoriesEndpoint}/tree`);
  }

  public getCategoryById(id: string) {
    return this.http.get<ICategory>(`${this.categoriesEndpoint}/${id}`);
  }

  public createCategory(category: ICategoryPost) {
    return this.http.post<ICategory>(this.categoriesEndpoint, category);
  }

  public updateCategory(id: string, category: ICategoryPost) {
    return this.http.patch<ICategory>(`${this.categoriesEndpoint}/${id}`, category);
  }

  public deleteCategory(id: string) {
    return this.http.delete<ICategory>(`${this.categoriesEndpoint}/${id}`);
  }
}

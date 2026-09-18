import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IExpenseData } from '@build-track/types';

export interface GetExpensesParams {
  projectId: string;
  categoryId?: string;
  supplierId?: string;
  dateFrom?: string;
  dateTo?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiExpensesService {
  private baseUrl = environment.apiUrl;
  private apiUrl = '/api/project/expenses';

  private http = inject(HttpClient);

  getExpenses(param: GetExpensesParams) {
    let url = `${this.baseUrl}${this.apiUrl}/${param.projectId}`;
    const { projectId, ...params } = param;
    url += '?' + new URLSearchParams(params as Record<string, string>).toString();

    return this.http.get<IExpenseData[]>(url);
  }
}

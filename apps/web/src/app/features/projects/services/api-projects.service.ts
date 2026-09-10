import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateProject, IProjectData } from '@build-track/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiProjectsService {
  private readonly baseUrl = environment.apiUrl;
  private readonly apiUrl = '/api/project';

  private readonly api = inject(HttpClient);

  private get fullApiUrl(): string {
    return `${this.baseUrl}${this.apiUrl}`;
  }

  public getUserProjects(): Observable<IProjectData[]> {
    return this.api.get<IProjectData[]>(this.fullApiUrl);
  }

  public createProject(data: ICreateProject): Observable<IProjectData> {
    return this.api.post<IProjectData>(this.fullApiUrl, data);
  }

  public deleteProject(projectId: string): Observable<void> {
    return this.api.delete<void>(`${this.fullApiUrl}/${projectId}`);
  }
}

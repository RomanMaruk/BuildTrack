import { Injectable, signal } from '@angular/core';
import { IProjectData } from '@build-track/types';

@Injectable({
  providedIn: 'root',
})
export class StoreProjectsService {
  private selectedProject = signal<IProjectData | null>(JSON.parse(localStorage.getItem('selectedProject') || 'null'));

  setSelectedProject(project: IProjectData | null) {
    this.selectedProject.set(project);
    localStorage.setItem('selectedProject', JSON.stringify(project));
  }

  public get getSelectedProject() {
    return this.selectedProject;
  }
}

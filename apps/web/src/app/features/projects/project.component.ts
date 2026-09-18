import { Component, inject, signal } from '@angular/core';
import { ApiProjectsService } from './services/api-projects.service';
import { shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CURRENCY_CODES, ICreateProject, IProjectData } from '@build-track/types';
import { form, required, FormField } from '@angular/forms/signals';
import { StoreProjectsService } from './services/store-projects.service';
import { Router } from '@angular/router';

const initialProjectForm = (): Required<ICreateProject> => ({
  name: '',
  baseCurrency: 'UAH',
  address: '',
});

@Component({
  selector: 'app-project',
  imports: [AsyncPipe, FormField],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  private readonly refreshProjects$ = new Subject<void>();

  private readonly apiProjectsService = inject(ApiProjectsService);
  private readonly router = inject(Router);
  private readonly storeProject = inject(StoreProjectsService);

  public readonly userProjects$ = this.refreshProjects$.pipe(
    startWith(void 0),
    switchMap(() => this.apiProjectsService.getUserProjects().pipe(shareReplay())),
    shareReplay(),
  );

  public readonly currencies = CURRENCY_CODES;

  public readonly projectForm = signal<Required<ICreateProject>>(initialProjectForm());

  public form = form(this.projectForm, (f) => {
    required(f.name);
    required(f.baseCurrency);
  });

  ngOnInit(): void {
    // Any initialization logic can go here
    this.userProjects$.subscribe({
      next: (projects) => {
        console.log('User projects:', projects);
      },
      error: (err) => {
        console.error('Error fetching user projects:', err);
      },
      complete: () => {
        console.log('User projects fetch complete');
      },
    });
  }

  createProject(): void {
    console.log('Create project button clicked');
    const isValid = this.form().valid();
    if (!isValid) {
      console.error('Form is invalid');
      return;
    }
    const newProjectData: ICreateProject = this.form().value();

    this.apiProjectsService.createProject(newProjectData).subscribe({
      next: (project) => {
        console.log('Project created:', project);
        if (!project) {
          console.error('Failed to create project');
          return;
        }

        this.projectForm.set(initialProjectForm());
        this.refreshProjects$.next();
      },
      error: (err) => {
        console.error('Error creating project:', err);
      },
    });
  }

  public selectProject(project: IProjectData): void {
    console.log('Project selected:', project);
    this.storeProject.setSelectedProject(project);
    this.router.navigate(['/dashboard']);
  }

  deleteProject(projectId: string): void {
    this.apiProjectsService.deleteProject(projectId).subscribe({
      next: () => {
        console.log('Project deleted:', projectId);
        this.refreshProjects$.next();
      },
      error: (err) => {
        console.error('Error deleting project:', err);
      },
    });
  }
}

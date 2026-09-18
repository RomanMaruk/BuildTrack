import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StoreProjectsService } from '../../projects/services/store-projects.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const selectedProject = inject(StoreProjectsService).getSelectedProject;

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  const isProjectsRoute = state.url === '/app/projects' || state.url === '/projects';

  if (!selectedProject()) {
    return isProjectsRoute ? true : router.createUrlTree(['/app/projects']);
  }

  if (isProjectsRoute) {
    return router.createUrlTree(['/app/dashboard']);
  }

  return true;
};

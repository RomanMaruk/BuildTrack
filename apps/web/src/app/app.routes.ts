import { Route } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { ShellComponent } from './layout/shell/shell.component';
import { authGuard } from './features/auth/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app',
  },
  ...authRoutes,
  {
    path: 'app',
    component: ShellComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

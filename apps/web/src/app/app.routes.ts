import { Route } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';

export const appRoutes: Route[] = [
    {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  ...authRoutes,
  {
    path: '**',
    redirectTo: 'login',
  },
];

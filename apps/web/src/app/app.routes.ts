import { Route } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { ShellComponent } from './layout/shell/shell.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ExpensesComponent } from './features/expenses/pages/expenses/expenses.component';
import { CategoriesComponent } from './features/categories/pages/categories/categories.component';
import { ExchangeRatesComponent } from './features/exchange-rates/pages/exchange-rates/exchange-rates.component';
import { ReportsComponent } from './features/reports/pages/reports/reports.component';
import { ImportExportComponent } from './features/import-export/pages/import-export/import-export.component';
import { ProjectComponent } from './features/projects/project.component';

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
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'exchange-rates', component: ExchangeRatesComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'import-export', component: ImportExportComponent },
      {
        path: 'projects',
        component: ProjectComponent,
        // loadComponent: () => import('./features/projects/project.component').then((m) => m.ProjectComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'app',
  },
];

import { Component, effect, inject, model, signal } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { CardAmountComponent } from '../../common/components/card-amount/card-amount.component';
import { DatePickerModule } from '@openng/optimus-ui/datepicker';
import { form, FormField } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { ExpenseByCategoryComponent } from './components/expense-by-category/expense-by-category.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { RecentExpensesComponent } from './components/recent-expenses/recent-expenses.component';
import { ExpenseTrendComponent } from './components/expense-trend/expense-trend.component';
import { StoreProjectsService } from '../projects/services/store-projects.service';
import { ApiExpensesService } from '../expenses/services/api-expenses.service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    AsyncPipe,
    CardAmountComponent,
    DatePickerModule,
    FormsModule,
    ExpenseByCategoryComponent,
    QuickActionsComponent,
    RecentExpensesComponent,
    ExpenseTrendComponent,
  ],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  positive = true;
  private storeProject = inject(StoreProjectsService);
  private apiExpenses = inject(ApiExpensesService);
  private dashboardService = inject(DashboardService);

  public initialDateRange: [Date, Date] = [this.toDate(this.storeProject.getSelectedProject()?.createdAt), new Date()];
  readonly rangeDatesModel = signal<[Date, Date]>(this.initialDateRange);
  readonly rangeDatesFormSignal = form(this.rangeDatesModel);

  public dashboardData$ = this.apiExpenses
    .getExpenses({ projectId: this.storeProject.getSelectedProject()?.id ?? '' })
    .pipe(map((expenses) => this.dashboardService.getDashboardData(expenses)));

  constructor() {
    effect(() => {
      console.log(this.rangeDatesModel());
    });
  }

  ngOnInit(): void {
    const selectedProject = this.storeProject.getSelectedProject();
    console.log('Selected project:', selectedProject);
    this.apiExpenses
      .getExpenses({ projectId: selectedProject?.id ?? '' })
      .pipe(map((expenses) => this.dashboardService.getDashboardData(expenses)))
      .subscribe((dashboardData) => {
        console.log(dashboardData);
      });
  }

  private toDate(value: Date | string | null | undefined): Date {
    if (!value) {
      return new Date();
    }

    const date = typeof value === 'string' ? new Date(value) : new Date(value);
    return Number.isNaN(date.getTime()) ? new Date() : date;
  }
}

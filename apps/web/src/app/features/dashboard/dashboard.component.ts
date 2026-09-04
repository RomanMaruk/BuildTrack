import { Component, effect, model, signal } from '@angular/core';
import { CardAmountComponent } from '../../common/components/card-amount/card-amount.component';
import { DatePickerModule } from '@openng/optimus-ui/datepicker';
import { form, FormField } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { ExpenseByCategoryComponent } from './components/expense-by-category/expense-by-category.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { RecentExpensesComponent } from './components/recent-expenses/recent-expenses.component';
import { ExpenseTrendComponent } from './components/expense-trend/expense-trend.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CardAmountComponent,
    DatePickerModule,
    FormsModule,
    ExpenseByCategoryComponent,
    QuickActionsComponent,
    RecentExpensesComponent,
    ExpenseTrendComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  positive = true;
  readonly rangeDatesModel = signal<[Date, Date]>([new Date(), new Date()]);
  readonly rangeDatesFormSignal = form(this.rangeDatesModel);

  constructor() {
    effect(() => {
      console.log(this.rangeDatesModel());
    });
  }
}

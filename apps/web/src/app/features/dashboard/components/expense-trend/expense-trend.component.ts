import { Component } from '@angular/core';
import { ExpenseTrendChartComponent } from '../../../../shared/charts/components/expense-trend-chart/expense-trend-chart.component';
import { IExpenseDynamics } from '../../../../shared/charts/models/chart.models';

@Component({
  selector: 'app-expense-trend',
  imports: [ExpenseTrendChartComponent],
  templateUrl: './expense-trend.component.html',
  styleUrl: './expense-trend.component.scss',
})
export class ExpenseTrendComponent {
  dataChart: IExpenseDynamics[] = [
    { period: 'Jan', uah: 1000, usd: 50 },
    { period: 'Feb', uah: 1200, usd: 60 },
    { period: 'Mar', uah: 900, usd: 5 },
    { period: 'Apr', uah: 1100, usd: 55 },
  ];
}

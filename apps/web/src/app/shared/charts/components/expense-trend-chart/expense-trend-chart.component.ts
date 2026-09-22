import { Component, computed, input } from '@angular/core';
import { IExpenseDynamics } from '../../models/chart.models';
import { expenseTrendChartOptions } from './expense-trend-chart.options';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-expense-trend-chart',
  imports: [NgxEchartsModule],
  templateUrl: './expense-trend-chart.component.html',
  styleUrl: './expense-trend-chart.component.scss',
})
export class ExpenseTrendChartComponent {
  dataChart = input.required<IExpenseDynamics[]>();

  options = computed(() => expenseTrendChartOptions(this.dataChart()));
}

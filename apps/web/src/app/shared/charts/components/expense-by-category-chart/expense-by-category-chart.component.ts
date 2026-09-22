import { Component, computed, input } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { IExpenseCategory } from '../../models/chart.models';
import { createExpenseByCategoryOptions } from './expense-by-category-chart.options';

@Component({
  selector: 'app-expense-by-category-chart',
  imports: [NgxEchartsModule],
  templateUrl: './expense-by-category-chart.component.html',
  styleUrl: './expense-by-category-chart.component.scss',
})
export class ExpenseByCategoryChartComponent {
  public dataChart = input.required<IExpenseCategory[]>();
  public options = computed(() => createExpenseByCategoryOptions(this.dataChart()));

  some() {
    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Expense by Category',
          type: 'pie',
          data: [
            { value: 1048, name: 'Category A' },
            { value: 735, name: 'Category B' },
            { value: 580, name: 'Category C' },
            { value: 484, name: 'Category D' },
            { value: 300, name: 'Category E' },
          ],
        },
      ],
    };
  }
}

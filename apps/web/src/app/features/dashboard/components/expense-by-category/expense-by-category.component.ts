import { Component } from '@angular/core';
import { ExpenseByCategoryChartComponent } from '../../../../shared/charts/components/expense-by-category-chart/expense-by-category-chart.component';

@Component({
  selector: 'app-expense-by-category',
  imports: [ExpenseByCategoryChartComponent],
  templateUrl: './expense-by-category.component.html',
  styleUrl: './expense-by-category.component.scss',
})
export class ExpenseByCategoryComponent {
  public dataChart = [
    { amount: 1048, category: 'Category A' },
    { amount: 735, category: 'Category B' },
    { amount: 580, category: 'Category C' },
    { amount: 484, category: 'Category D' },
    { amount: 300, category: 'Category E' },
  ];
}

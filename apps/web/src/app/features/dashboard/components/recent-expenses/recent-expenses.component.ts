import { Component } from '@angular/core';
import { TableModule } from '@openng/optimus-ui/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recent-expenses',
  imports: [TableModule, RouterLink],
  templateUrl: './recent-expenses.component.html',
  styleUrl: './recent-expenses.component.scss',
})
export class RecentExpensesComponent {
  products = [
    {
      date: '2026-06-01',
      category: 'Food',
      subCategory: 'Groceries',
      name: 'Walmart',
      amount: 50,
      sum: 50,
      currency: 'USD',
    },
    {
      date: '2024-06-02',
      category: 'Transport',
      subCategory: 'Taxi',
      name: 'Uber',
      amount: 20,
      sum: 70,
      currency: 'USD',
    },
    {
      date: '2024-06-02',
      category: 'Transport',
      subCategory: 'Taxi',
      name: 'Uber',
      amount: 20,
      sum: 70,
      currency: 'USD',
    },
  ];
}

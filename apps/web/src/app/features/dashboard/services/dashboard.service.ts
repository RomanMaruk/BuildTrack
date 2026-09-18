import { Service } from '@angular/core';
import { IExpenseData } from '@build-track/types';

export interface IDataDashboard {
  totalExpenses: number;
  totalToDay: number;
  totalThisMonth: number;
  amountBaying: number;
  amountOfMounth: number;
}

@Service()
export class DashboardService {
  public getDashboardData(expenses: IExpenseData[]): IDataDashboard {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalToDay = expenses
      .filter((expense) => new Date(expense.date).toDateString() === new Date().toDateString())
      .reduce((sum, expense) => sum + expense.amount, 0);
    const totalThisMonth = expenses
      .filter((expense) => {
        const now = new Date();
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
    const amountBaying = expenses.length;

    const purchaseDates = expenses.map((expense) => new Date(expense.date).getTime()).filter(Number.isFinite);
    const firstPurchaseDate = purchaseDates.length ? new Date(Math.min(...purchaseDates)) : null;
    const lastPurchaseDate = purchaseDates.length ? new Date(Math.max(...purchaseDates)) : null;
    const amountOfMounth =
      firstPurchaseDate && lastPurchaseDate
        ? (lastPurchaseDate.getFullYear() - firstPurchaseDate.getFullYear()) * 12 +
          lastPurchaseDate.getMonth() -
          firstPurchaseDate.getMonth()
        : 0;

    // Implement the logic to fetch and return the dashboard data
    return {
      totalExpenses,
      totalToDay,
      totalThisMonth,
      amountBaying,
      amountOfMounth,
    };
  }
}

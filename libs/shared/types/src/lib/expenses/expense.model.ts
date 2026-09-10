import { ExpenseUnit } from '../enums/expense-unit.enum';

export interface ICreateExpense {
  categoryId: string;
  supplierId?: string;
  date: Date;
  currency: string;
  quantity: number;
  unit: ExpenseUnit;
  amount: number;
  rate?: number;
  description?: string;
}

export interface IExpenseData extends ICreateExpense {
  id: string;
  projectId: string;
  userId: string;
  amountBase: number;
  createdAt: Date;
  updatedAt: Date;
}

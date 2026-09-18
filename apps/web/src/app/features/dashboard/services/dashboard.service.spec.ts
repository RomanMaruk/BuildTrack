import { TestBed } from '@angular/core/testing';
import { ExpenseUnit } from '@build-track/types';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate the number of months between the first and last purchase', () => {
    const result = service.getDashboardData([
      {
        id: '1',
        projectId: 'project',
        userId: 'user',
        categoryId: 'category',
        date: new Date('2024-01-15'),
        currency: 'UAH',
        quantity: 1,
        unit: ExpenseUnit.PC,
        amount: 100,
        amountBase: 100,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        projectId: 'project',
        userId: 'user',
        categoryId: 'category',
        date: new Date('2025-04-15'),
        currency: 'UAH',
        quantity: 1,
        unit: ExpenseUnit.PC,
        amount: 200,
        amountBase: 200,
        createdAt: new Date('2025-04-15'),
        updatedAt: new Date('2025-04-15'),
      },
    ]);

    expect(result.amountOfMounth).toBe(15);
  });

  it('should return zero months when there are no purchases', () => {
    expect(service.getDashboardData([]).amountOfMounth).toBe(0);
  });
});

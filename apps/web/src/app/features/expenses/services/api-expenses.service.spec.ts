import { TestBed } from '@angular/core/testing';
import { ApiExpensesService } from './api-expenses.service';

describe('ApiExpensesService', () => {
  let service: ApiExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

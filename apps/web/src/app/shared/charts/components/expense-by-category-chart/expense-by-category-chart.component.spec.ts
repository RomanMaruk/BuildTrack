import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseByCategoryChartComponent } from './expense-by-category-chart.component';

describe('ExpenseByCategoryChartComponent', () => {
  let component: ExpenseByCategoryChartComponent;
  let fixture: ComponentFixture<ExpenseByCategoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseByCategoryChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseByCategoryChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

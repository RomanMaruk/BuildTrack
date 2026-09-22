import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseTrendChartComponent } from './expense-trend-chart.component';

describe('ExpenseTrendChartComponent', () => {
  let component: ExpenseTrendChartComponent;
  let fixture: ComponentFixture<ExpenseTrendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseTrendChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseTrendChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseTrendComponent } from './expense-trend.component';

describe('ExpenseTrendComponent', () => {
  let component: ExpenseTrendComponent;
  let fixture: ComponentFixture<ExpenseTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseTrendComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseTrendComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

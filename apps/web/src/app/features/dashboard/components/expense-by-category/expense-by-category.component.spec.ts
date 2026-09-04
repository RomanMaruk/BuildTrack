import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseByCategoryComponent } from './expense-by-category.component';

describe('ExpenseByCategoryComponent', () => {
  let component: ExpenseByCategoryComponent;
  let fixture: ComponentFixture<ExpenseByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseByCategoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseByCategoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

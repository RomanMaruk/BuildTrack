import { TestBed } from '@angular/core/testing';
import { CategoriesNodeTreeService } from './categories-node-tree.service';

describe('CategoriesNodeTreeService', () => {
  let service: CategoriesNodeTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesNodeTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

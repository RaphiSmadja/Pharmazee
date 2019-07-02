import { TestBed } from '@angular/core/testing';

import { ListproductorderService } from './listproductorder.service';

describe('ListproductorderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListproductorderService = TestBed.get(ListproductorderService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FavoriteproductService } from './favoriteproduct.service';

describe('FavoriteproductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoriteproductService = TestBed.get(FavoriteproductService);
    expect(service).toBeTruthy();
  });
});

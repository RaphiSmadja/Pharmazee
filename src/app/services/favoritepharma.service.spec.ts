import { TestBed } from '@angular/core/testing';

import { FavoritepharmaService } from './favoritepharma.service';

describe('FavoritepharmaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoritepharmaService = TestBed.get(FavoritepharmaService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HomeSectionService } from './home-section.service';

describe('HomeSectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeSectionService = TestBed.get(HomeSectionService);
    expect(service).toBeTruthy();
  });
});

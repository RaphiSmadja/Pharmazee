import { TestBed } from '@angular/core/testing';

import { ListoftagService } from './listoftag.service';

describe('ListoftagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListoftagService = TestBed.get(ListoftagService);
    expect(service).toBeTruthy();
  });
});

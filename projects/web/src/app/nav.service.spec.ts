import { TestBed } from '@angular/core/testing';

import { NavService } from './nav.service';

describe('NavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavService = TestBed.get(NavService);
    expect(service).toBeTruthy();
  });
});

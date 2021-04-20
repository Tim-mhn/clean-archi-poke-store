import { TestBed } from '@angular/core/testing';

import { IsLoggedInActivateGuard } from './is-logged-in-activate.guard';

describe('IsLoggedInActivateGuard', () => {
  let guard: IsLoggedInActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsLoggedInActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

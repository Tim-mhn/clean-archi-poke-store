import { TestBed } from '@angular/core/testing';

import { ShoppingCartTotalEstimateService } from './shopping-cart-total-estimate.service';

describe('ShoppingCartTotalEstimateService', () => {
  let service: ShoppingCartTotalEstimateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartTotalEstimateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

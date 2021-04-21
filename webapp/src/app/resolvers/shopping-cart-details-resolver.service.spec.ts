import { TestBed } from '@angular/core/testing';

import { ShoppingCartDetailsResolverService } from './shopping-cart-details-resolver.service';

describe('ShoppingCartDetailsResolverService', () => {
  let service: ShoppingCartDetailsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartDetailsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

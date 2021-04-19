import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CheckoutFormModel } from '../interfaces/checkout.interface';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private _shoppingCartService: ShoppingCartService) { }

  payShoppingCart(checkoutFormData: CheckoutFormModel) {
    const shoppingCartId = this._shoppingCartService.getCartIdFromStoreId(checkoutFormData.storeId);
    return of('success').toPromise();
  }
}

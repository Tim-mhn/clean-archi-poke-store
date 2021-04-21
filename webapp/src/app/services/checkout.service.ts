import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CheckoutInputDTO, CheckoutOutputDTO } from '../api-dto/checkout.dto';
import { CheckoutFormModel } from '../interfaces/checkout.interface';
import { PendingService } from './pending.service';
import { ShoppingCartService } from './shopping-cart.service';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private readonly CHECKOUT_URI = "http://localhost:4000/checkout/";

  constructor(private http: HttpClient,
    private _shoppingCartService: ShoppingCartService,
    private _pendingService: PendingService) { }

  payShoppingCart(checkoutFormData: CheckoutFormModel) {
    const shoppingCartId = this._shoppingCartService.getCartIdFromStoreId(checkoutFormData.storeId);

    console.log('shopping cart id: ', shoppingCartId);
    const checkoutBody: CheckoutInputDTO = {
      cardCVV: checkoutFormData.cardCVV,
      cardNumber: checkoutFormData.cardNumber,
      cardOwner: checkoutFormData.cardOwner,
      shoppingCartId: shoppingCartId
    }
    return this.http.post<CheckoutOutputDTO>(this.CHECKOUT_URI, checkoutBody).toPromise();
  }
}

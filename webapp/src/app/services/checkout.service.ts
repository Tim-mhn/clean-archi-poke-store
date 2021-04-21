import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CheckoutInputDTO, CheckoutOutputDTO } from '../api-dto/checkout.dto';
import { PendingService } from './pending.service';
import { ShoppingCartService } from './shopping-cart.service';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private readonly CHECKOUT_URI = "http://localhost:4000/checkout/";

  constructor(private http: HttpClient,
    private _shoppingCartService: ShoppingCartService) {}

  payShoppingCart(checkoutFormData: { cardCVV: string, cardNumber: string, cardOwner: string, storeId: string}) {
    const shoppingCartId = this._shoppingCartService.getCartIdFromStoreId(checkoutFormData.storeId);

    const checkoutBody: CheckoutInputDTO = {
      cardCVV: checkoutFormData.cardCVV,
      cardNumber: checkoutFormData.cardNumber,
      cardOwner: checkoutFormData.cardOwner,
      shoppingCartId: shoppingCartId
    }
    return this.http.post<CheckoutOutputDTO>(this.CHECKOUT_URI, checkoutBody).toPromise();
  }
}

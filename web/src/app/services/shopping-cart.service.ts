import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCart } from '../interfaces/shopping-cart.interface';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly SHOPPING_CART_URI = "http://localhost:4000/shopping-cart/";
  private storeIdToCartId = {};
  private _shoppingCart: BehaviorSubject<ShoppingCart> = new BehaviorSubject(null);
  public shoppingCartObs: Observable<ShoppingCart> = this._shoppingCart.asObservable();
  constructor(private http: HttpClient) { 
  }

  createShoppingCart(storeId: string): Promise<ShoppingCart> {
    const emptyBody = {};
    return this.http.post<{ shoppingCart: ShoppingCart}>(`${this.SHOPPING_CART_URI}?storeId=${storeId}`, emptyBody)
      .pipe(map(({ shoppingCart }) => shoppingCart))
      .toPromise()
  }

  async addPokemonToShoppingCart(pokemonId: string, storeId: string) {
    let cartId = this.storeIdToCartId[storeId];
    if (!cartId) {
      const emptyCart = await this.createShoppingCart(storeId);
      cartId = emptyCart.shoppingCartId;
      this.storeIdToCartId[storeId] = cartId;
    }

    const cart = await this.http.post<ShoppingCart>(`${this.SHOPPING_CART_URI}${cartId}/pokemon/${pokemonId}`, {}).toPromise();
  }

  getShoppingCartDetails(cartId: string): Promise<ShoppingCart> {
    const now = new Date();
    return this.http.get<ShoppingCart>(`${this.SHOPPING_CART_URI}${cartId}?date=${now}`).toPromise();
  }

}

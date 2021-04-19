import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCart } from '../interfaces/shopping-cart.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly SHOPPING_CART_URI = "http://localhost:4000/shopping-cart/";
  private storeIdToCartId = {};
  private _storeIdToShoppingCartSubject: BehaviorSubject<Map<string, ShoppingCart>> = new BehaviorSubject(new Map());
  public storeIdToShoppingCartObs: Observable<Map<string, ShoppingCart>> = this._storeIdToShoppingCartSubject.asObservable();
  constructor(private http: HttpClient) {
  }

  private _createShoppingCart(storeId: string): Promise<ShoppingCart> {
    const emptyBody = {};
    return this.http.post<{ shoppingCart: ShoppingCart }>(`${this.SHOPPING_CART_URI}?storeId=${storeId}`, emptyBody)
      .pipe(map(({ shoppingCart }) => shoppingCart))
      .toPromise()
  }

  async addPokemonToShoppingCart(pokemonId: string, storeId: string) {
    let cartId = this.storeIdToCartId[storeId];
    if (!cartId) {
      const emptyCart = await this._createShoppingCart(storeId);
      cartId = emptyCart.shoppingCartId;
      this.storeIdToCartId[storeId] = cartId;
    }

    await this.http.post<ShoppingCart>(`${this.SHOPPING_CART_URI}${cartId}/pokemon/${pokemonId}`, {}).toPromise();
    await this._updateShoppingCart(storeId);
  }

  async _updateShoppingCart(storeId: string) {
    const storeShoppingCartDetails = await this._getShoppingCartDetailsFromStoreId(storeId);
    this._storeIdToShoppingCartSubject.next({
      ...this._storeIdToShoppingCartSubject.getValue(),
      [storeId]: storeShoppingCartDetails
    });
  }

  private _getShoppingCartDetails(cartId: string): Promise<ShoppingCart> {
    const now = new Date();
    return this.http.get<ShoppingCart>(`${this.SHOPPING_CART_URI}${cartId}?date=${now}`).toPromise();
  }

  private async _getShoppingCartDetailsFromStoreId(storeId: string) {
    const cartId = this.storeIdToCartId[storeId];
    if (!cartId) return null;
    return await this._getShoppingCartDetails(cartId);
  }

  public getCartIdFromStoreId(storeId: string) {
    return this.storeIdToCartId[storeId];
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCart } from '../interfaces/shopping-cart.interface';
import { map } from 'rxjs/operators';
import { AvailablePokemon } from '../interfaces/available-pokemon.interface';
import { ShoppingCartTotalEstimateService } from './shopping-cart-total-estimate.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly SHOPPING_CART_URI = "http://localhost:4000/shopping-cart/";
  private storeIdToCartId = {};
  private _storeIdToShoppingCartSubject: BehaviorSubject<Map<string, ShoppingCart>> = new BehaviorSubject(new Map());
  public storeIdToShoppingCartObs: Observable<Map<string, ShoppingCart>> = this._storeIdToShoppingCartSubject.asObservable();
  constructor(private http: HttpClient,
    private _shoppingCartTotalEstimateService: ShoppingCartTotalEstimateService) {
  }

  private _createShoppingCart(storeId: string): Promise<ShoppingCart> {
    const emptyBody = {};
    return this.http.post<{ shoppingCart: ShoppingCart }>(`${this.SHOPPING_CART_URI}?storeId=${storeId}`, emptyBody)
      .pipe(map(({ shoppingCart }) => shoppingCart))
      .toPromise()
  }

  async addPokemonToShoppingCart(pokemonToAdd: AvailablePokemon, storeId: string) {
    let cartId = this.storeIdToCartId[storeId];
    if (!cartId) {
      const emptyCart = await this._createShoppingCart(storeId);
      cartId = emptyCart.shoppingCartId;
      this.storeIdToCartId[storeId] = cartId;
    }
    this._shoppingCartTotalEstimateService.addPriceToTotal(storeId, pokemonToAdd.unitPrice);
    await this.http.post<ShoppingCart>(`${this.SHOPPING_CART_URI}${cartId}/pokemon/${pokemonToAdd.pokemon.id}`, {}).toPromise();

  }

  // async _updateShoppingCart(storeId: string) {
  //   const storeShoppingCartDetails = await this._getShoppingCartDetailsFromStoreId(storeId);
  //   this._storeIdToShoppingCartSubject.next({
  //     ...this._storeIdToShoppingCartSubject.getValue(),
  //     [storeId]: storeShoppingCartDetails
  //   });
  // }


  public getShoppingCartDetailsFromStoreId(storeId: string) {
    const cartId = this.getCartIdFromStoreId(storeId);
    if (!cartId) return null;
    const now = new Date();
    return this.http.get<ShoppingCart>(`${this.SHOPPING_CART_URI}${cartId}?date=${now}`);
  }

  public getCartIdFromStoreId(storeId: string) {
    return this.storeIdToCartId[storeId];
  }

}

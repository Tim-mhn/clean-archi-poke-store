import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCart } from '../interfaces/shopping-cart.interface';
import { map } from 'rxjs/operators';
import { AvailablePokemon } from '../interfaces/available-pokemon.interface';
import { ShoppingCartTotalEstimateService } from './shopping-cart-total-estimate.service';
import { CreateShoppingCartOutputDTO } from '../api-dto/create-shopping-cart.dto';
import { AddPokemonToCartOutputDTO } from '../api-dto/add-pokemon-to-cart.dto';

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

  private _createShoppingCart(storeId: string) {
    const emptyBody = {};
    return this.http.post<CreateShoppingCartOutputDTO>(`${this.SHOPPING_CART_URI}?storeId=${storeId}`, emptyBody)
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
    await this.http.post<AddPokemonToCartOutputDTO>(`${this.SHOPPING_CART_URI}${cartId}/pokemon/${pokemonToAdd.pokemon.id}`, {}).toPromise();

  }


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

import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { CartSumupComponent } from 'src/app/components/cart-sumup/cart-sumup.component';
import { AvailablePokemon } from 'src/app/interfaces/available-pokemon.interface';
import { Pending, Status } from 'src/app/interfaces/pending.interface';
import { StoreWithAvailablePokemons } from 'src/app/interfaces/store.interface';
import { ShoppingCartTotalEstimateService } from 'src/app/services/shopping-cart-total-estimate.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {
  @ViewChild(CartSumupComponent) private cartSumupComponent : CartSumupComponent;

  storeId: string;
  public storeAndPokesData: StoreWithAvailablePokemons;
  public status: Observable<Status>;

  private _subs: Subscription = new Subscription();

  constructor(
    private _storeService: StoreService,
    private _actRoute: ActivatedRoute,
    private _shoppingCartService: ShoppingCartService) {
  }


  ngOnInit(): void {
    this.storeId = this._actRoute.snapshot.params.storeId;
    const storeAndPokes$ = this._storeService.getStoreAndAvailablePokemons(this.storeId);
    this._subs.add(storeAndPokes$.data.subscribe(data => {
      this.storeAndPokesData = data;
    }));
    this._subs.add(storeAndPokes$.status.subscribe((status: Status) => {
      this.status = of(status);
    }));
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  onAddPokemon(pokemonToAdd: AvailablePokemon) {
    this._shoppingCartService.addPokemonToShoppingCart(pokemonToAdd, this.storeId);
  }



}

import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AvailablePokemon } from 'src/app/interfaces/available-pokemon.interface';
import { StoreWithAvailablePokemons } from 'src/app/interfaces/store.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  storeId: string;
  public storeAndPokes$: Observable<StoreWithAvailablePokemons>;

  constructor(
    private _storeService: StoreService,
    private _actRoute: ActivatedRoute,
    private _shoppingCartService: ShoppingCartService) {
  }


  ngOnInit(): void {
    this.storeId = this._actRoute.snapshot.params.storeId;
    this.storeAndPokes$ = this._storeService.getStoreAndAvailablePokemons(this.storeId).pipe(shareReplay());
  }


  onAddPokemon(pokemonToAdd: AvailablePokemon) {
    this._shoppingCartService.addPokemonToShoppingCart(pokemonToAdd, this.storeId);
  }



}

import { AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Observable, of, Subscription } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { AvailablePokemon } from 'src/app/interfaces/available-pokemon.interface';
import { PokemonFilter } from 'src/app/interfaces/filter.interface';
import { StoreWithAvailablePokemons } from 'src/app/interfaces/store.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StoreService } from 'src/app/services/store.service';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, AfterViewInit {

  @ViewChildren(PokemonCardComponent) pokemonCards!: QueryList<PokemonCardComponent>;
  storeId: string;
  pokemonFilter: PokemonFilter;
  pokemonTypes$: Observable<Iterable<string>>;
  unitPriceBounds$: Observable<Iterable<number>>;
  public storeAndPokes$: Observable<StoreWithAvailablePokemons>;

  constructor(
    private _storeService: StoreService,
    private _actRoute: ActivatedRoute,
    private _shoppingCartService: ShoppingCartService,
    private _snackbarService: SnackbarService) {
  }


  ngOnInit(): void {
    this.storeId = this._actRoute.snapshot.params.storeId;
    this.storeAndPokes$ = this._storeService.getStoreAndAvailablePokemons(this.storeId).pipe(tap(storeWithPokes => {
      
      let pokemonTypes = storeWithPokes.availablePokemons.reduce<string[]>((_types, poke) => _types.concat(poke.pokemon.type), []);
      this.pokemonTypes$ = of(new Array(...new Set(pokemonTypes)));

      const minPrice = storeWithPokes.availablePokemons.reduce<number>((_min, poke) => _min <= poke.unitPrice ? _min : poke.unitPrice, Number.MAX_VALUE);
      const maxPrice = storeWithPokes.availablePokemons.reduce<number>((_max, poke) => _max >= poke.unitPrice ? _max : poke.unitPrice, 0);
      this.unitPriceBounds$ = of([minPrice, maxPrice]);
    }),
    shareReplay());
  }

  ngAfterViewInit() {
    // Highlight first and last card
    this.pokemonCards.changes.subscribe((pokemonCardsList: QueryList<PokemonCardComponent>) => {
      // pokemonCardsList.first.setHighlightTheme();
      // pokemonCardsList.last.setHighlightTheme();

    });

  }

  updatePokemonList(pokemonFilter: PokemonFilter) {
    this.pokemonFilter = pokemonFilter;
  }


  onAddPokemon(pokemonToAdd: AvailablePokemon) {
    this._shoppingCartService.addPokemonToShoppingCart(pokemonToAdd, this.storeId)
    .then(() => this._openSuccessSnackbar())
    .catch(err => this._openErrorSnackbar());
  }

  _openSuccessSnackbar() {
    this._snackbarService.openSuccessSnackbar('successfully added pokemon to cart !')

  }

  _openErrorSnackbar() {
    this._snackbarService.openErrorSnackbar('error when adding pokemon to cart :(')
  }



}

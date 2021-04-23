import { AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AvailablePokemon } from 'src/app/interfaces/available-pokemon.interface';
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
export class StoreComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChildren(PokemonCardComponent) pokemonCards!: QueryList<PokemonCardComponent>;
  storeId: string;
  public storeAndPokes$: Observable<StoreWithAvailablePokemons>;

  constructor(
    private _storeService: StoreService,
    private _actRoute: ActivatedRoute,
    private _shoppingCartService: ShoppingCartService,
    private _snackbarService: SnackbarService) {
  }


  ngOnInit(): void {
    this.storeId = this._actRoute.snapshot.params.storeId;
    this.storeAndPokes$ = this._storeService.getStoreAndAvailablePokemons(this.storeId).pipe(shareReplay());
  }

  ngAfterViewInit() {
    // Highlight first and last card
    this.pokemonCards.changes.subscribe((pokemonCardsList: QueryList<PokemonCardComponent>) => {
      pokemonCardsList.first.colorTheme = 'highlight';
      pokemonCardsList.last.colorTheme = 'highlight';

    });

  }
  ngAfterViewChecked() {
    // console.count('after view checked called');
    // this.pokemonCards.toArray().forEach(pokemonCard => console.log(pokemonCard));
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

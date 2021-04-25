import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { interval, ReplaySubject, Subscription } from 'rxjs';
import { throttle } from 'rxjs/operators';
import { AvailablePokemon } from 'src/app/interfaces/available-pokemon.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  @Input("availablePokemonData") pokemonData: AvailablePokemon;
  @Input("storeId") storeId: string;
  public colorTheme: 'classic' | 'highlight' = 'classic';
  public icon: string;
  @Output() addPokemon = new EventEmitter<AvailablePokemon>();

  private _addPokemonClickSubject = new ReplaySubject<AvailablePokemon>();
  private _addPokemonSub: Subscription;

  private ADD_POKEMON_CLICK_THROTTLE = 1000;

  constructor() { }

  ngOnInit(): void {
    this._setTypeIcon(this.pokemonData.pokemon.type);
    this._addPokemonSub = this._addPokemonClickSubject.asObservable()
      .pipe(throttle(() => interval(this.ADD_POKEMON_CLICK_THROTTLE)))
      .subscribe(pokemonToAdd => this.addPokemon.emit(pokemonToAdd))
  }

  emitAddPokemonEvent() {
    this._addPokemonClickSubject.next(this.pokemonData);
  }

  setHighlightTheme() {
    this.colorTheme = 'highlight';
  }

  _setTypeIcon(type: string) {
    switch (type) {
      case 'fire':
        this.icon = 'local_fire_department';
        break

      case 'grass':
        this.icon = 'grass';
        break;

      case 'water':
        this.icon = 'water_drop';
        break;

      case 'bug':
        this.icon = 'bug_report';
        break;

      case 'electric':
        this.icon = 'bolt'
        break;

      case 'poison':
        this.icon = 'science';
        break;

      case 'earth':
        this.icon = 'public'

      default:
        this.icon = 'not_listed_location';

    }
  }

  ngOnDestroy(): void {
    this._addPokemonSub.unsubscribe();
  }


}

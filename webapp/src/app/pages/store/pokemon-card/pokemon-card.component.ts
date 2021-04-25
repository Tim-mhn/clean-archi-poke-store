import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AvailablePokemon } from 'src/app/interfaces/available-pokemon.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input("availablePokemonData") pokemonData: AvailablePokemon;
  @Input("storeId") storeId: string;
  public colorTheme: 'classic' | 'highlight' = 'classic';
  public icon: string;
  @Output() addPokemon = new EventEmitter<AvailablePokemon>();

  constructor() { }

  ngOnInit(): void {
    this._setTypeIcon(this.pokemonData.pokemon.type);
  }

  emitAddPokemonEvent() {
    this.addPokemon.emit(this.pokemonData);
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

}

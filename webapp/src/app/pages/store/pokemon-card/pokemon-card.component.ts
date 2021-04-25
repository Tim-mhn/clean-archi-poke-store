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
  @Output() addPokemon = new EventEmitter<AvailablePokemon> ();

  constructor() { }

  ngOnInit(): void {
  }

  emitAddPokemonEvent() {
    this.addPokemon.emit(this.pokemonData);
  }

  setHighlightTheme() {
    this.colorTheme = 'highlight';
  }

}

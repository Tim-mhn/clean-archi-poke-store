import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private _shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  onAddToCart() {
    this._shoppingCartService.addPokemonToShoppingCart(this.pokemonData.pokemon.id, this.storeId);
  }

}

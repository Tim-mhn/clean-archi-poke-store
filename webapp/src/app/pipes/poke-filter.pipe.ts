import { Pipe, PipeTransform } from '@angular/core';
import { AvailablePokemon } from '../interfaces/available-pokemon.interface';
import { PokemonFilter } from '../interfaces/filter.interface';

@Pipe({
  name: 'pokeFilter'
})
export class PokeFilterPipe implements PipeTransform {

  transform(pokemons: AvailablePokemon[], filter: PokemonFilter): unknown {
    if (!filter) return pokemons;
    // Pokemons that are available if filter is activated
    pokemons = filter.onlyAvailable ? pokemons.filter(p => p.quantity > 0) : pokemons;
    // Pokemons with matching type
    pokemons = filter.types.length > 0 ? pokemons.filter(p => filter.types.includes(p.pokemon.type)): pokemons;
    // Pkoemons that have unitPrice between min/max price of filter
    pokemons = pokemons.filter(p => filter.unitPrice[0] <= p.unitPrice && p.unitPrice <= filter.unitPrice[1])
    return pokemons;
  }

}

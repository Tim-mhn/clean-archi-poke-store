import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { AvailablePokemon } from '../interfaces/available-pokemon.interface';
import { PokemonFilter } from '../interfaces/filter.interface';

@Pipe({
  name: 'pokeFilter'
})
export class PokeFilterPipe implements PipeTransform {
  transform(pokemons: AvailablePokemon[], pokeFilter: PokemonFilter): AvailablePokemon[] {

    if (!pokeFilter) return pokemons;
    // Pokemons that are available if filter is activated
    pokemons = pokeFilter.onlyAvailable ? pokemons.filter(p => p.quantity > 0) : pokemons;
    // Pokemons with matching type
    pokemons = pokeFilter.types.length > 0 ? pokemons.filter(p => pokeFilter.types.includes(p.pokemon.type)) : pokemons;
    // Pkoemons that have unitPrice between min/max price of filter
    pokemons = pokemons.filter(p => pokeFilter.unitPrice[0] <= p.unitPrice && p.unitPrice <= pokeFilter.unitPrice[1])
    // Pokemons with name matching text input
    if (pokeFilter.name && pokeFilter.name.length > 0) {
      const lwrTextFilter = pokeFilter.name.toLowerCase();
      pokemons = pokemons.filter(p => p.pokemon.name.toLowerCase().includes(lwrTextFilter));
    }
    return pokemons;



  }

}

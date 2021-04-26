import { Pipe, PipeTransform } from '@angular/core';
import { AvailablePokemon } from '../interfaces/available-pokemon.interface';
import { PokeSortField, Sorter } from '../interfaces/sort.interface';
import { getNestedProperty } from '../utils/map';

@Pipe({
  name: 'pokeSort'
})
export class PokeSortPipe implements PipeTransform {

  private readonly NESTED_FIELD_MAP = {
    weight: ['pokemon', 'weight'],
  }


  transform(pokes: AvailablePokemon[], sorter: Sorter): AvailablePokemon[] {
    if (!sorter || !sorter.by) return pokes;

    // Get nested property array or regular property
    const nestedSortField = this._getFieldOrNestedField(sorter.by);


    return sorter.asc ?
      pokes.sort((p1, p2) => getNestedProperty(p1, nestedSortField) - getNestedProperty(p2, nestedSortField))
      : pokes.sort((p1, p2) => -getNestedProperty(p1, nestedSortField) + getNestedProperty(p2, nestedSortField));
    ;
  }

  private _getFieldOrNestedField(sortBy: PokeSortField) {
    return sortBy in this.NESTED_FIELD_MAP ? this.NESTED_FIELD_MAP[sortBy] : sortBy;
  }

}




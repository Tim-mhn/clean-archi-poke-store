import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { PokemonFilter } from 'src/app/interfaces/filter.interface';
import { Options } from '@angular-slider/ngx-slider';
import { debounceTime, map, startWith, tap } from 'rxjs/operators';


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit, OnDestroy {
  @Output() filterChange = new EventEmitter<PokemonFilter>();

  // Pokemon Types
  private _types = [];
  @Input() set types(_types) {
    this._types = _types;
  }
  get types() {
    return this._types;
  }

  // Min and max unit price
  private _unitPriceBounds = [];
  @Input() set unitPriceBounds(_unitPriceBounds) {
    if (!_unitPriceBounds || _unitPriceBounds.length <= 0) return
    this._unitPriceBounds = _unitPriceBounds;
    
    this.options = {
      floor: this._unitPriceBounds[0],
      ceil: this._unitPriceBounds[1]
    }
    this.filterForm.patchValue({unitPrice: this._unitPriceBounds})
  }
  get unitPriceBounds() {
    return this._unitPriceBounds;
  }

  options: Options = {
    floor: 0,
    ceil: Number.MAX_SAFE_INTEGER
  };


  filterForm = new FormGroup({
    noDebounce: new FormGroup({
      onlyAvailable: new FormControl(true),
      types: new FormControl([]),
      unitPrice: new FormControl([this.options.floor, this.options.ceil]),
    }),
    name: new FormControl('')
  })

  private subs = new Subscription();

  constructor() { }

  ngOnInit(): void {
    const pokeFilterSub = this._pokeFilterSub();
    this.subs.add(pokeFilterSub);
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }



  private _pokeFilterSub() {
    const noDebounceChanges$ = this._getOtherFormChanges$();
    const textChangeWDebounce$ = this._getTextChange$();

    const updatePokeFilter$ = combineLatest([noDebounceChanges$, textChangeWDebounce$])
      .pipe(map(([noDebounceVal, textVal]) => {
        const pokeFilter: PokemonFilter = {
          ...noDebounceVal,
          name: textVal
        }
        return pokeFilter;
      }))

    return updatePokeFilter$.subscribe((newPokeFilterValue: PokemonFilter) => {
      this.filterChange.emit(newPokeFilterValue);
    })
  }

  private _getTextChange$() {
    const FILTER_DEBOUNCE_MS = 500;
    // add startWith to emit initial value (otherwise combineLatest will wait for a change in name field before emitting event)
    return this.filterForm.controls.name.valueChanges.pipe(startWith(''), debounceTime(FILTER_DEBOUNCE_MS))
  }

  private _getOtherFormChanges$() {
    return this.filterForm.controls.noDebounce.valueChanges;
  }

}

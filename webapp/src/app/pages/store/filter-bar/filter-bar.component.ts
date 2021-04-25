import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Observable, Subscription } from 'rxjs';
import { PokemonFilter } from 'src/app/interfaces/filter.interface';
import { Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit, OnDestroy {
  onlyAvailable: boolean = false;
  @Output() filterChange = new EventEmitter<PokemonFilter>();


  private _types = [];

  @Input() set types(_types) {
    this._types = _types;
  }
  get types() {
    return this._types;
  }

  private _unitPriceBounds = [];

  @Input() set unitPriceBounds(_unitPriceBounds) {
    console.log('unit price bounds:', _unitPriceBounds)
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
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: Number.MAX_SAFE_INTEGER
  };
  filterForm = new FormGroup({
    onlyAvailable: new FormControl(false),
    types: new FormControl([]),
    unitPrice: new FormControl([0, 1000])
  })

  subs = new Subscription();
  constructor() { }

  ngOnInit(): void {
    this.subs.add(this.filterForm.valueChanges.subscribe(filterValues => this.filterChange.emit(filterValues)));
    // this.unitPriceBounds$.subscribe(unitPriceBounds => {
    //   console.log(unitPriceBounds)
    //   this.options = {
    //     floor: unitPriceBounds[0],
    //     ceil: unitPriceBounds[1]
    //   }
    // })

  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}

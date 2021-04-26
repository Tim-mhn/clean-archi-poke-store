import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { PokeSortField, Sorter } from 'src/app/interfaces/sort.interface';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent implements OnInit {
  @Output("sorter") $sorter = new EventEmitter<Sorter>();
  sortBy: PokeSortField = null
  sortAsc = true;
  constructor() { }

  ngOnInit(): void {
  }

  invertSortDir() {
    this.sortAsc = !this.sortAsc;
  }


  sortByChange(newSortBy: PokeSortField) {
    this.sortBy = newSortBy
    this._emitSorterEvent();

  }

  sortAscChange() {
    this.sortAsc = !this.sortAsc;
    this._emitSorterEvent();
  }

  private _emitSorterEvent() {
    this.$sorter.emit({
      by: this.sortBy,
      asc: this.sortAsc
    })
  }
}



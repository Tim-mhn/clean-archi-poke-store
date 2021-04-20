import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pending } from 'src/app/interfaces/pending.interface';
import { Store } from 'src/app/interfaces/store.interface';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stores$: Pending<Store[]>;

  constructor(private _storeService: StoreService) {
  }

  ngOnInit(): void {
    this.stores$ = this._storeService.getAllStores();
  }



}

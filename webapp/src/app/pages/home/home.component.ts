import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from 'src/app/interfaces/store.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  stores: Store[] = [];
  storesSusbscription: Subscription;
  constructor(private _storeService: StoreService) {
  }

  ngOnInit(): void {
    this.storesSusbscription = this._storeService.storesObs.subscribe(stores => {
      console.log('stores:', stores);
      this.stores = stores
    })
  }

  ngOnDestroy(): void {
    this.storesSusbscription.unsubscribe();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Pending } from 'src/app/interfaces/pending.interface';
import { Store } from 'src/app/interfaces/store.interface';
import { StoreService } from 'src/app/services/store.service';
import { Status } from '../../interfaces/pending.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly stores$: Pending<Store[]>;
  readonly Status = Status;

  constructor(public _storeService: StoreService) {
    // this.stores$ = this._storeService.getStoresObservable();
  }

  ngOnInit(): void {

  }

 

}

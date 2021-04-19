import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pending, Status } from 'src/app/interfaces/pending.interface';
import { StoreWithAvailablePokemons } from 'src/app/interfaces/store.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  storeId: string;
  public storeAndPokes$: Pending<StoreWithAvailablePokemons>;
  constructor(private _storeService: StoreService,
    private _actRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.storeId = this._actRoute.snapshot.params.storeId;
    this.storeAndPokes$ = this._storeService.getStoreAndAvailablePokemons(this.storeId);
    console.log(this.storeAndPokes$);
  }

 

}

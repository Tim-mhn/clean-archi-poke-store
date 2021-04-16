import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreWithAvailablePokemons } from 'src/app/interfaces/store.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {
  storeId: string;

  storeData: StoreWithAvailablePokemons ;
  private _storeDataSub: Subscription;
  constructor(private _storeService: StoreService,
    private _actRoute: ActivatedRoute) { 
    this.storeData = {
      availablePokemons: [],
      id: null,
      name: null,
      location: null
    };
    }

  ngOnInit(): void {
    this.storeId = this._actRoute.snapshot.params.storeId;

    this._storeDataSub = this._storeService.findById(this.storeId).subscribe(storeWithAvailablePokes => {
      this.storeData = storeWithAvailablePokes;
    })
  }

  ngOnDestroy() {
    this._storeDataSub.unsubscribe();
  }

}

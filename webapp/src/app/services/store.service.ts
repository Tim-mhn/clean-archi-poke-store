import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pending, Status } from '../interfaces/pending.interface';
import { Store, StoreWithAvailablePokemons } from '../interfaces/store.interface';
import { PendingService } from './pending.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly STORES_URI = "http://localhost:4000/stores";
  public readonly stores$: Pending<Store[]>;

  constructor(private http: HttpClient,
              private _pendingService: PendingService) {
    this.stores$ = this._getStoresPendingObservable();

  }

  public findById(storeId: string) {
    return this.http.get<StoreWithAvailablePokemons>(`${this.STORES_URI}/${storeId}/pokemons`);
  }

  public getStoreAndAvailablePokemons(storeId: string) {
    console.log('getStoreAndAvailablePokemons called')
    const storeWithAvailablePokemons$ = this.http.get<StoreWithAvailablePokemons>(`${this.STORES_URI}/${storeId}/pokemons`)
    return this._pendingService.observableToPending(storeWithAvailablePokemons$);
  }


  private _getStoresPendingObservable(): Pending<Store[]> {
    const allStores$ = this._getAllStoresRequest();
    return this._pendingService.observableToPending(allStores$);
  }



  private _getAllStoresRequest() {
    return this.http.get<Store[]>(this.STORES_URI);
  }

}

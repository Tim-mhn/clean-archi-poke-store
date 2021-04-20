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

  constructor(private http: HttpClient,
              private _pendingService: PendingService) {

  }

  public findById(storeId: string) {
    return this.http.get<StoreWithAvailablePokemons>(`${this.STORES_URI}/${storeId}/pokemons`);
  }

  public getStoreAndAvailablePokemons(storeId: string) {
    const storeWithAvailablePokemons$ = this.http.get<StoreWithAvailablePokemons>(`${this.STORES_URI}/${storeId}/pokemons`)
    return this._pendingService.observableToPending(storeWithAvailablePokemons$);
  }



  public getAllStores() {
    const allStores$ =  this.http.get<Store[]>(this.STORES_URI);
    return this._pendingService.observableToPending(allStores$);

  }

}

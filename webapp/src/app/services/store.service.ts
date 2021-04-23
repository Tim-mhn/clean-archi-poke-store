import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pending, Status } from '../interfaces/pending.interface';
import { Store, StoreWithAvailablePokemons } from '../interfaces/store.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly STORES_URI = "http://localhost:4000/stores";

  constructor(private http: HttpClient) {

  }

  public findById(storeId: string) {
    return this.http.get<StoreWithAvailablePokemons>(`${this.STORES_URI}/${storeId}/pokemons`);
  }

  public getStoreAndAvailablePokemons(storeId: string) {
    return this.http.get<StoreWithAvailablePokemons>(`${this.STORES_URI}/${storeId}/pokemons`)
  }



  public getAllStores() {
    return this.http.get<Store[]>(this.STORES_URI);
  }

}

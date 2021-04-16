import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store, StoreWithAvailablePokemons } from '../interfaces/store.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly STORES_URI = "http://localhost:4000/stores";

  private _stores: BehaviorSubject<Store[]> = new BehaviorSubject([]);
  public storesObs = this._stores.asObservable();

  constructor(private http: HttpClient) {
    this.initiallyGetAllStores();

  }


  private initiallyGetAllStores(): void {
    console.log('initally getting stores called');
    this.http.get<Store[]>(this.STORES_URI).subscribe(stores => {
      console.log(stores);
      this._stores.next(stores);
    });
  }

  public findById(storeId: string) {
    return this.http.get<StoreWithAvailablePokemons>(`${this.STORES_URI}/${storeId}/pokemons`);
  }
}

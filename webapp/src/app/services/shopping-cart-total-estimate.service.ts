import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartTotalEstimateService {

  private _storeIdToCartTotalEstimate: BehaviorSubject<Map<string, number>> = new BehaviorSubject(new Map<string, number> ());
  public storeIdToCartTotalEstimate$ = this._storeIdToCartTotalEstimate.asObservable();
  constructor() { }


  addPriceToTotal(storeId: string, price: number) {
    const obsValue = this._storeIdToCartTotalEstimate.getValue();
    if (storeId in obsValue) {
      obsValue[storeId] += price;
    } else {
      obsValue[storeId] = price;
    }
    this._storeIdToCartTotalEstimate.next(obsValue);
  }
}

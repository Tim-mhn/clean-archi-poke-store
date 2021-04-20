import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'src/app/interfaces/shopping-cart.interface';
import { ShoppingCartTotalEstimateService } from 'src/app/services/shopping-cart-total-estimate.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-cart-sumup',
  templateUrl: './cart-sumup.component.html',
  styleUrls: ['./cart-sumup.component.scss']
})
export class CartSumupComponent implements OnInit, OnDestroy {

  @Input("storeId") storeId: string;
  totalEstimate: number = 0;
  private _sub: Subscription;
  constructor(private _shoppingCartTotalEstimateService: ShoppingCartTotalEstimateService) {
   }


  ngOnInit(): void {
    this._sub = this._shoppingCartTotalEstimateService.storeIdToCartTotalEstimate$.subscribe(storeIdToTotal => {
      try {
        this.totalEstimate = storeIdToTotal[this.storeId] ? storeIdToTotal[this.storeId] : 0;
      } catch (e) {
        this.totalEstimate = 0;
      }
    })
  }

  ngOnDestroy(): void {
    if (this._sub) this._sub.unsubscribe();
  }


}

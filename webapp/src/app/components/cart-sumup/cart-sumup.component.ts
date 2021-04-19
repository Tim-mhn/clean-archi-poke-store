import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/interfaces/shopping-cart.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-cart-sumup',
  templateUrl: './cart-sumup.component.html',
  styleUrls: ['./cart-sumup.component.scss']
})
export class CartSumupComponent implements OnInit {

  @Input("storeId") storeId: string;
  cartDetails: ShoppingCart;
  constructor(private _shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this._shoppingCartService.storeIdToShoppingCartObs.subscribe(storeIdToShoppingCart => {
      const cartDetails: ShoppingCart = storeIdToShoppingCart[this.storeId];
      this.cartDetails = cartDetails;
    })
  }

}

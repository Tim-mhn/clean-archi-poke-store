import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from 'src/app/interfaces/shopping-cart.interface';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {
  storeId: string;
  shoppingCartId: string;
  shoppingCart: ShoppingCart;
  constructor(private _activatedRoute: ActivatedRoute) {
    this.storeId = this._activatedRoute.snapshot.params.storeId;
    this.shoppingCartId = this._activatedRoute.snapshot.params.shoppingCartId;
   }

  ngOnInit(): void {
    this._activatedRoute.data
      .subscribe((data: { shoppingCart: ShoppingCart }) => this.shoppingCart = data.shoppingCart);
  }

}

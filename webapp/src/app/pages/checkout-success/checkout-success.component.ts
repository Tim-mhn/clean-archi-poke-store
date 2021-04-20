import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {
  storeId: string;
  shoppingCartId: string;
  constructor(private _activatedRoute: ActivatedRoute) {
    this.storeId = this._activatedRoute.snapshot.params.storeId;
    this.shoppingCartId = this._activatedRoute.snapshot.params.shoppingCartId;
   }

  ngOnInit(): void {
  }

}

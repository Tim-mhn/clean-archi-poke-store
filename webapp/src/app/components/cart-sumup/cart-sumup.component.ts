import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-sumup',
  templateUrl: './cart-sumup.component.html',
  styleUrls: ['./cart-sumup.component.scss']
})
export class CartSumupComponent implements OnInit {
  @Input("cartPrice") cartPrice: number = 0;
  @Input("readyDate") readyDate: Date;
  @Input("storeId") storeId: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}

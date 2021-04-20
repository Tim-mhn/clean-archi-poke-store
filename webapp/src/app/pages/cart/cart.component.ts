import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/interfaces/shopping-cart.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  shoppingCart$: Observable<ShoppingCart>;
  storeId: string;
  displayedColumns: string[] = ['name', 'unitPrice', 'quantity'];
  // private cartDetailsSub: Subscription;
  constructor(private _actRoute: ActivatedRoute,
    private _shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.storeId = this._actRoute.snapshot.params.storeId;
    // this._shoppingCartService.storeIdToShoppingCartObs.subscribe(storeIdToShoppingCart => {
    //   const cartDetails: ShoppingCart = storeIdToShoppingCart[this.storeId];
    //   if (cartDetails) this.cartDetails = cartDetails;
      
    // });
    this.shoppingCart$ = this._shoppingCartService.getShoppingCartDetailsFromStoreId(this.storeId)


  }



}

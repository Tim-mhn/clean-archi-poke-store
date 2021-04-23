import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
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
  constructor(private _actRoute: ActivatedRoute,
    private _shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.storeId = this._actRoute.snapshot.params.storeId;
    this.shoppingCart$ = this._shoppingCartService
    .getShoppingCartDetailsFromStoreId(this.storeId)
    .pipe(shareReplay());

  }



}

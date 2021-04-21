import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartDetailsResolverService implements Resolve<any> {

  constructor(private _shoppingCartService: ShoppingCartService,
    private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const shoppingCartId = route.paramMap.get('shoppingCartId');
    return this._shoppingCartService.getShoppingCartDetailsFromCartId(shoppingCartId)
      .pipe(mergeMap(shoppingCart => {
        if (shoppingCart) {
          return of(shoppingCart);
        } else { // id not found
          this.router.navigate(['']);
          return EMPTY;
        }
      }))
  }
}

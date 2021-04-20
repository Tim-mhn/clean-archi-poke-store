import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInActivateGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router)  { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn =  this._authService.isLoggedIn();
    if (!isLoggedIn) {
      console.log(state.url);
      this.router.navigate(['/login'], { queryParams: { returnUrl:state.url}});
      return false;
    }
    
    return true;
  }
  
}

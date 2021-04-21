import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDeactivateGuard implements CanDeactivate<ConfirmDeactivatiblePage> {
  canDeactivate(
    component: ConfirmDeactivatiblePage,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const canDeactivate = component.canDeactivate ? component.canDeactivate(): false;
    return canDeactivate ? canDeactivate : window.confirm('Do you really want to exit page ?');
  }

}

export interface ConfirmDeactivatiblePage {
  canDeactivate(): boolean | Observable<boolean>;
}

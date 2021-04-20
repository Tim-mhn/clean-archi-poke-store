import { Injectable } from '@angular/core';
import { from, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedIn = false;

  constructor() { }

  public logIn(username: string, password: string) {
    const logInsuccess = true;
    return of(logInsuccess).pipe(delay(1000), tap((loggedIn) => this._loggedIn = loggedIn)).toPromise();
  }

  public isLoggedIn() {
    return this._loggedIn;
  }
}

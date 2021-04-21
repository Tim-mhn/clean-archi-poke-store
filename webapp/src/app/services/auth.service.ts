import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User, UserRole } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedIn = new BehaviorSubject(false);
  public loggedIn$ = this._loggedIn.asObservable();

  constructor() { }

  public logIn(username: string, password: string) {
    const user = FAKE_USERS.find(u => u.username == username);
    const logInsuccess = user && user.password == password;

    return of(logInsuccess)
      .pipe(delay(1000), tap((loggedIn) => {
        if (loggedIn) {
          this._loggedIn.next(loggedIn);
        } else {
          throw new Error('Error login with crendentials')
        }
      }))
      .toPromise();
  }

}


const FAKE_USERS: User[] = [
  {
    username: "timhn",
    password: "password",
    role: UserRole.GUEST
  },
  {
    username: "admin",
    password: "password",
    role: UserRole.ADMIN
  },
  {
    username: "guest",
    password: "password",
    role: UserRole.GUEST
  }
]

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn$: Observable<boolean>;
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.loggedIn$ = this._authService.loggedIn$;
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formData = {
    username: '',
    password: ''
  }
  private returnUrl = '';
  private _subs = new Subscription();
  constructor(private _authService: AuthService,
              private _activatedRoute: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this._subs.add(this._activatedRoute.queryParamMap.subscribe(params =>  {
      this.returnUrl = params.get('returnUrl');
    }))
  }

  onSubmit() {
    this._authService.logIn(this.formData.username, this.formData.password).then(res => {
      console.log(this.returnUrl);
      const urlArrays = this.returnUrl.split('/');
      console.log(urlArrays);
      this.router.navigate(urlArrays.splice(1));
    });
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

}

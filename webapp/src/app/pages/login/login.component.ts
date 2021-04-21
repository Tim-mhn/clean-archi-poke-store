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
  error = false;
  loading = false;

  constructor(private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this._subs.add(this._activatedRoute.queryParamMap.subscribe(params => {
      this.returnUrl = params.get('returnUrl');
    }))
  }

  onSubmit() {
    this.loading = true;
    this._authService.logIn(this.formData.username, this.formData.password)
      .then(res => {
        try {
          const urlArrays = this.returnUrl.split('/');
          this.router.navigate(urlArrays.splice(1));
        } catch (e) {
          const defaultUrl = [''];
          this.router.navigate(defaultUrl);
        }
      })
      .catch(err => {
        console.error(err);
        this.error = true;
      })
      .finally(() => this.loading = false);
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

}

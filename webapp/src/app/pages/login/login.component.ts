import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, Subscription } from 'rxjs';
import { RequestStatus } from 'src/app/interfaces/request-status.interface';
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
  requestStatusEnum = RequestStatus;
  requestStatus: RequestStatus = RequestStatus.NOT_CALLED;
  constructor(private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this._subs.add(this._activatedRoute.queryParamMap.subscribe(params => {
      this.returnUrl = params.get('returnUrl');
    }))
  }

  async onSubmit() {
    this.requestStatus = RequestStatus.LOADING;
    try {
      await this._authService.logIn(this.formData.username, this.formData.password);
      this.requestStatus = RequestStatus.SUCCESS;
      try {
        const urlArrays = this.returnUrl.split('/');
        this.router.navigate(urlArrays.splice(1));
      } catch (e) {
        const defaultUrl = [''];
        this.router.navigate(defaultUrl);
      }
    } catch (e) {

      this.requestStatus = RequestStatus.ERROR;
    }

  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

}

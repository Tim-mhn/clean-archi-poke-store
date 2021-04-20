import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CheckoutFormModel } from 'src/app/interfaces/checkout.interface';
import { Pending, Status } from 'src/app/interfaces/pending.interface';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  formData: CheckoutFormModel = {
    cardOwner: '',
    cardNumber: '',
    cardCVV: '',
    storeId: ''
  };
  storeId: string;
  public checkout$: Pending<any> = {
    data: of(null),
    status: of(Status.SUCCESS)
  };

  constructor(private _activatedRoute: ActivatedRoute,
    private router: Router,
    private _checkoutService: CheckoutService) {
    this.storeId = this._activatedRoute.snapshot.params.storeId;
    this.formData.storeId = this.storeId;
  }

  ngOnInit(): void {
  }

  log = (e) => console.log(e);
  onSubmit() {
    console.log(this.formData);
    this._checkoutService.payShoppingCart(this.formData).then(checkoutOutput => {
      this.router.navigate([checkoutOutput.shoppingCartId, 'success'], { relativeTo: this._activatedRoute})
    })
      .catch(err => console.error(err));
  }

}

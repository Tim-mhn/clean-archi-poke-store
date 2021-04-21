import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ConfirmDeactivatiblePage } from 'src/app/guards/confirm-deactivate.guard';
import { Pending, Status } from 'src/app/interfaces/pending.interface';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, ConfirmDeactivatiblePage {

  checkoutForm = this.fb.group({
    cardOwner: ['', Validators.required],
    cardNumber: ['', Validators.required],
    cardCVV: ['', Validators.required],
  });

  storeId: string;
  loading = false;
  submitted = false;

  constructor(private _activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _checkoutService: CheckoutService) {
    this.storeId = this._activatedRoute.snapshot.params.storeId;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.checkoutForm);
    this.loading = true;
    const checkoutInput = { ...this.checkoutForm.value, storeId: this.storeId };
    this._checkoutService.payShoppingCart(checkoutInput)
      .then(checkoutOutput => {
        this.submitted = true;
        this.router.navigate([checkoutOutput.shoppingCartId, 'success'], { relativeTo: this._activatedRoute })
      })
      .catch(err => console.error(err))
      .finally(() => this.loading = false);
  }

  // Can only exit with no confirmation if form has been submitted
  canDeactivate(): boolean | Observable<boolean> {
    return this.submitted;
  }

}

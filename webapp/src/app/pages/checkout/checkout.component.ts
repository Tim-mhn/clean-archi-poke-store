import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutFormModel } from 'src/app/interfaces/checkout.interface';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

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
  constructor(private _activatedRoute: ActivatedRoute,
              private _checkoutService: CheckoutService) {
    this.storeId = this._activatedRoute.snapshot.params.storeId;
    this.formData.storeId = this.storeId;
  }

  ngOnInit(): void {
  }

  log = (e) => console.log(e);
  onSubmit() {
    console.log(this.formData);
    this._checkoutService.payShoppingCart(this.formData).then(() => console.log('success !')).catch(err => console.error(err));
  }

}

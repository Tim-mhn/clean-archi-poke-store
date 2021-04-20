import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmDeactivateGuard } from './guards/confirm-deactivate.guard';
import { IsLoggedInActivateGuard } from './guards/is-logged-in-activate.guard';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutSuccessComponent } from './pages/checkout-success/checkout-success.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { StoreComponent } from './pages/store/store.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'stores/:storeId', component: StoreComponent },
  { path: 'stores/:storeId/cart', component: CartComponent, canActivate: [IsLoggedInActivateGuard] },
  { path: 'stores/:storeId/checkout', component: CheckoutComponent, canActivate: [IsLoggedInActivateGuard], canDeactivate: [ConfirmDeactivateGuard] },
  { path: 'stores/:storeId/checkout/:shoppingCartId/success', component: CheckoutSuccessComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { StoreComponent } from './pages/store/store.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stores/:storeId', component: StoreComponent },
  { path: 'stores/:storeId/cart', component: CartComponent },
  { path: 'stores/:storeId/checkout', component: CheckoutComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

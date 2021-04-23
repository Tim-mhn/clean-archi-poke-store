import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { StoreComponent } from './pages/store/store.component';
import { StoreCardComponent } from './pages/home/store-card/store-card.component';
import { PokemonCardComponent } from './pages/store/pokemon-card/pokemon-card.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { CartSumupComponent } from './components/cart-sumup/cart-sumup.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './components/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { CheckoutSuccessComponent } from './pages/checkout-success/checkout-success.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HighlightOnHoverDirective } from './directives/highlight-on-hover.directive';
import { TooltipDirective } from './directives/tooltip.directive';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AsyncRenderDirective } from './directives/async-render.directive';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HomeComponent,
    StoreComponent,
    StoreCardComponent,
    PokemonCardComponent,
    CartSumupComponent,
    LoadingComponent,
    CheckoutComponent,
    CheckoutSuccessComponent,
    LoginComponent,
    HeaderComponent,
    HighlightOnHoverDirective,
    TooltipDirective,
    LoadingSpinnerComponent,
    AsyncRenderDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoadingSpinnerComponent],

})
export class AppModule { }

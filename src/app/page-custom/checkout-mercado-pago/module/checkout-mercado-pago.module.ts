import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CheckoutMercadoPagoRoutingModule } from './checkout-mercado-pago-routing.module';
import { CheckoutMercadoPagoComponent } from '../ui/checkout-mercado-pago/checkout-mercado-pago.component';

@NgModule({
  declarations: [
    CheckoutMercadoPagoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckoutMercadoPagoRoutingModule
  ],
  exports: [
    CheckoutMercadoPagoComponent
  ]
})
export class CheckoutMercadoPagoModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckOutMPPaymentAdditionalComponent } from '../ui/checkout-mp-payment-additional/check-out-mp-payment-additional.component';
import { CheckOutMPPaymentAdditionalRoutingModule } from './check-out-mp-payment-additional-routing.module';

@NgModule({
  declarations: [
    CheckOutMPPaymentAdditionalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckOutMPPaymentAdditionalRoutingModule
  ],
  exports: [
    CheckOutMPPaymentAdditionalComponent
  ]
})
export class CheckOutMPPaymentAdditionalModule { }

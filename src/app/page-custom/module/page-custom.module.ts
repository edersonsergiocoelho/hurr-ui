import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerValidationModule } from '../customer-validation/module/customer-validation.module';
import { CheckoutModule } from '../checkout/module/checkout.module';
import { CheckoutMercadoPagoModule } from '../checkout-mercado-pago/module/checkout-mercado-pago.module';
import { EarningsModule } from '../earnings/module/earnings.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Modules - PageCustomModule
    CheckoutModule,
    CheckoutMercadoPagoModule,
    CustomerValidationModule,
    EarningsModule
  ], 
  exports: [
    CheckoutModule,
    CheckoutMercadoPagoModule,
    CustomerValidationModule,
    EarningsModule
  ]
})
export class PageCustomModule { }

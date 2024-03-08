import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerValidationModule } from '../customer-validation/module/customer-validation.module';
import { CheckoutModule } from '../checkout/module/checkout.module';
import { CheckoutMercadoPagoModule } from '../checkout-mercado-pago/module/checkout-mercado-pago.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Modules - PageCustomModule
    CheckoutModule,
    CheckoutMercadoPagoModule,
    CustomerValidationModule
  ], 
  exports: [
    CheckoutModule,
    CheckoutMercadoPagoModule,
    CustomerValidationModule
  ]
})
export class PageCustomModule { }

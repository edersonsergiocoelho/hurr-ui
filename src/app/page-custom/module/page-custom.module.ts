import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerValidationModule } from '../customer-validation/module/customer-validation.module';
import { CheckOutModule } from '../check-out/module/check-out.module';
import { CheckOutMPModule } from '../check-out-mp/module/check-out-mp.module';
import { CheckOutMPPaymentAdditionalModule } from '../check-out-mp-payment-additional/module/check-out-mp-payment-additional.module';
import { EarningsModule } from '../earnings/module/earnings.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Modules - PageCustomModule
    CheckOutModule,
    CheckOutMPModule,
    CheckOutMPPaymentAdditionalModule,
    CustomerValidationModule,
    EarningsModule
  ], 
  exports: [
    CheckOutModule,
    CheckOutMPModule,
    CheckOutMPPaymentAdditionalModule,
    CustomerValidationModule,
    EarningsModule
  ]
})
export class PageCustomModule { }

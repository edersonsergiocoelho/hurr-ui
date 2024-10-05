import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutMPPaymentAdditionalComponent } from '../ui/checkout-mp-payment-additional/check-out-mp-payment-additional.component';

const routes: Routes = [
  {path: 'checkout/mp/payment-additional', component: CheckOutMPPaymentAdditionalComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckOutMPPaymentAdditionalRoutingModule { }

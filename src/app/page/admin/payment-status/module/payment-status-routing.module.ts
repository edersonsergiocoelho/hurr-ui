import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentStatusComponent } from '../ui/payment-status/payment-status.component';

const routes: Routes = [
  {path: 'payment-status', component: PaymentStatusComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentStatusRoutingModule { }

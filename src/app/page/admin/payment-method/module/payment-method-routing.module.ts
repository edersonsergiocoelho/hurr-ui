import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentMethodComponent } from '../ui/payment-method/payment-method.component';

const routes: Routes = [
  {path: 'payment-method', component: PaymentMethodComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentMethodRoutingModule { }

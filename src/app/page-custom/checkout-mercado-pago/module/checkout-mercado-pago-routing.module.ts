import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutMercadoPagoComponent } from '../ui/checkout-mercado-pago/checkout-mercado-pago.component';

const routes: Routes = [
  {path: 'checkout/mercado-pago', component: CheckoutMercadoPagoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutMercadoPagoRoutingModule { }

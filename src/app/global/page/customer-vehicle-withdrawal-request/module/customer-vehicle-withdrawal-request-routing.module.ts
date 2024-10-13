import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerVehicleWithdrawalRequestComponent } from '../ui/customer-vehicle-withdrawal-request/customer-vehicle-withdrawal-request.component';

const routes: Routes = [
  {path: 'customer-vehicle-withdrawal-request', component: CustomerVehicleWithdrawalRequestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerVehicleWithdrawalRequestRoutingModule { }
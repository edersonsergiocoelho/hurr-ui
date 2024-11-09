import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerVehicleBankAccountComponent } from '../ui/customer-vehicle-bank-account/customer-vehicle-bank-account.component';

const routes: Routes = [
  {path: 'settings/customer-vehicle-bank-account', component: CustomerVehicleBankAccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerVehicleBankAccountRoutingModule { }

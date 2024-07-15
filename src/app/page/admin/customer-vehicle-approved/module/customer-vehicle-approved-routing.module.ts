import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerVehicleApprovedComponent } from '../ui/customer-vehicle-approved/customer-vehicle-approved.component';

const routes: Routes = [
  {path: 'customer-vehicle-approved', component: CustomerVehicleApprovedComponent},
  //{path: 'customer-vehicle-approved/detail/:customerVehicleApprovedId', component: FileApprovedDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerVehicleApprovedRoutingModule { }

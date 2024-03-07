import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerVehicleBookingSuccessComponent } from '../ui/customer-vehicle-booking-success/customer-vehicle-booking-success.component';
import { CustomerVehicleBookingComponent } from '../ui/customer-vehicle-booking/customer-vehicle-booking.component';

const routes: Routes = [
  {path: 'customer-vehicle-booking', component: CustomerVehicleBookingComponent},
  {path: 'customer-vehicle-booking/success', component: CustomerVehicleBookingSuccessComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerVehicleBookingRoutingModule { }

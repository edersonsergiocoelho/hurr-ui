import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerVehicleBookingSuccessComponent } from '../ui/customer-vehicle-booking-success/customer-vehicle-booking-success.component';
import { CustomerVehicleBookingComponent } from '../ui/customer-vehicle-booking/customer-vehicle-booking.component';
import { CustomerVehicleBookingCustomerVehicleComponent } from '../ui/customer-vehicle-booking-customer-vehicle/customer-vehicle-booking-customer-vehicle.component';
import { CustomerVehicleBookingCustomerVehicleViewInvoiceComponent } from '../ui/customer-vehicle-booking-customer-vehicle-view-invoice/customer-vehicle-booking-customer-vehicle-view-invoice.component';
import { CustomerVehicleBookingViewReservationComponent } from '../ui/customer-vehicle-booking-view-reservation/customer-vehicle-booking-view-reservation.component';
import { CustomerVehicleBookingViewInvoiceComponent } from '../ui/customer-vehicle-booking-view-invoice/customer-vehicle-booking-view-invoice.component';

const routes: Routes = [
  // Customer
  {path: 'customer-vehicle-booking', component: CustomerVehicleBookingComponent},
  {path: 'customer-vehicle-booking/success', component: CustomerVehicleBookingSuccessComponent},
  {path: 'customer-vehicle-booking/view-invoice/:customerVehicleBookingId', component: CustomerVehicleBookingViewInvoiceComponent},
  {path: 'customer-vehicle-booking/view-reservation/:customerVehicleBookingId', component: CustomerVehicleBookingViewReservationComponent},

  // CustomerVehicle
  {path: 'customer-vehicle-booking/customer-vehicle', component: CustomerVehicleBookingCustomerVehicleComponent},
  {path: 'customer-vehicle-booking/customer-vehicle/view-invoice/:customerVehicleBookingId', component: CustomerVehicleBookingCustomerVehicleViewInvoiceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerVehicleBookingRoutingModule { }

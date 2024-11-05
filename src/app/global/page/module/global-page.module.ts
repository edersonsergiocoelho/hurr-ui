import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../home/module/home.module';
import { CustomerVehicleModule } from '../customer-vehicle/module/customer-vehicle.module';
import { AddressModule } from '../address/module/address.module';
import { CustomerAddressModule } from '../customer-address/module/customer-address.module';
import { CustomerVehicleBookingModule } from '../customer-vehicle-booking/module/customer-vehicle-booking.module';
import { CustomerVehicleWithdrawalRequestModule } from '../customer-vehicle-withdrawal-request/module/customer-vehicle-withdrawal-request.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    AddressModule,
    CustomerAddressModule,
    CustomerVehicleModule,
    CustomerVehicleBookingModule,
    CustomerVehicleWithdrawalRequestModule,
    HomeModule
  ],
  exports: [
    AddressModule,
    CustomerAddressModule,
    CustomerVehicleModule,
    CustomerVehicleBookingModule,
    CustomerVehicleWithdrawalRequestModule,
    HomeModule
  ]
})
export class GlobalPageModule { }

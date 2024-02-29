import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../home/module/home.module';
import { CustomerVehicleModule } from '../customer-vehicle/module/customer-vehicle.module';
import { AddressModule } from '../address/module/address.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    AddressModule,
    CustomerVehicleModule,
    HomeModule
  ],
  exports: [
    AddressModule,
    CustomerVehicleModule,
    HomeModule
  ]
})
export class GlobalPageModule { }

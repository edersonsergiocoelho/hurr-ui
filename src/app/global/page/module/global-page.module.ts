import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from '../home/module/home.module';
import { CustomerVehicleModule } from '../customer-vehicle/module/customer-vehicle.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    CustomerVehicleModule,
    HomeModule
  ],
  exports: [
    CustomerVehicleModule,
    HomeModule
  ]
})
export class GlobalPageModule { }

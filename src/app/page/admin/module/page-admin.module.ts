import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleBrandModule } from '../vehicle-brand/module/vehicle-brand.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    VehicleBrandModule
  ], 
  exports: [
    VehicleBrandModule
  ]
})
export class PageAdminModule { }

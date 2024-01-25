import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleBrandModule } from '../vehicle-brand/module/vehicle-brand.module';
import { RoleModule } from '../role/module/role.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    RoleModule,
    VehicleBrandModule
  ], 
  exports: [
    RoleModule,
    VehicleBrandModule
  ]
})
export class PageAdminModule { }

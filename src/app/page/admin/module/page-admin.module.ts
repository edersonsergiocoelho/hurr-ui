import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleBrandModule } from '../vehicle-brand/module/vehicle-brand.module';
import { RoleModule } from '../role/module/role.module';
import { UserRoleModule } from '../user-role/module/user-role.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    RoleModule,
    UserRoleModule,
    VehicleBrandModule
  ], 
  exports: [
    RoleModule,
    UserRoleModule,
    VehicleBrandModule
  ]
})
export class PageAdminModule { }

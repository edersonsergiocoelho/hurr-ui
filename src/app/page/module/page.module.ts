import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from '../user/module/user.module';
import { PageAdminModule } from '../admin/module/page-admin.module';
import { CustomerVehicleBankAccountModule } from '../customer-vehicle-bank-account/module/customer-vehicle-bank-account.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Modules - PageModule
    CustomerVehicleBankAccountModule,
    UserModule
  ], 
  exports: [
    CustomerVehicleBankAccountModule,
    UserModule
  ]
})
export class PageModule { }

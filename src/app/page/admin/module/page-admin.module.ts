import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleBrandModule } from '../vehicle-brand/module/vehicle-brand.module';
import { RoleModule } from '../role/module/role.module';
import { UserRoleModule } from '../user-role/module/user-role.module';
import { FileApprovedModule } from '../file-approved/module/file-approved.module';
import { CustomerVehicleApprovedModule } from '../customer-vehicle-approved/module/customer-vehicle-approved.module';
import { PaymentStatusModule } from '../payment-status/module/payment-status.module';
import { PaymentMethodModule } from '../payment-method/module/payment-method.module';
import { BankModule } from '../bank/module/bank.module';
import { UserPreferenceModule } from '../user-preference/module/user-preference.module';
import { FeeModule } from '../fee/module/fee.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    BankModule,
    CustomerVehicleApprovedModule,
    FeeModule,
    FileApprovedModule,
    PaymentMethodModule,
    PaymentStatusModule,
    RoleModule,
    UserRoleModule,
    VehicleBrandModule
  ], 
  exports: [
    BankModule,
    CustomerVehicleApprovedModule,
    FeeModule,
    FileApprovedModule,
    PaymentMethodModule,
    PaymentStatusModule,
    RoleModule,
    UserRoleModule,
    UserPreferenceModule,
    VehicleBrandModule
  ]
})
export class PageAdminModule { }

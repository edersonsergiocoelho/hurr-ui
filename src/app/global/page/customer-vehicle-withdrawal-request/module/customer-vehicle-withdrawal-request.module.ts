import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerVehicleWithdrawalRequestRoutingModule } from './customer-vehicle-withdrawal-request-routing.module';
import { CustomerVehicleWithdrawalRequestComponent } from '../ui/customer-vehicle-withdrawal-request/customer-vehicle-withdrawal-request.component';
import { CustomerVehicleWithdrawalRequestApprovalComponent } from '../ui/customer-vehicle-withdrawal-request-approval/customer-vehicle-withdrawal-request-approval.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { UtilsPipeModule } from 'src/app/utils/pipe/module/utils-pipe.module';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [
    CustomerVehicleWithdrawalRequestComponent,
    CustomerVehicleWithdrawalRequestApprovalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerVehicleWithdrawalRequestRoutingModule,

    UtilsPipeModule,

    // Translate
    TranslateModule,

    // PrimeNG
    ButtonModule,
    DropdownModule,
    InputMaskModule,
    SidebarModule,
    TableModule
  ],
  exports: [
    CustomerVehicleWithdrawalRequestComponent,
    CustomerVehicleWithdrawalRequestApprovalComponent,
  ]
})
export class CustomerVehicleWithdrawalRequestModule { }

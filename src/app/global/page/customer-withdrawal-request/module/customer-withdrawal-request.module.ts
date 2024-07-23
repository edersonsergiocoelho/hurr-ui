import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerWithdrawalRequestRoutingModule } from './customer-withdrawal-request-routing.module';
import { CustomerWithdrawalRequestComponent } from '../ui/customer-withdrawal-request/customer-withdrawal-request.component';
import { CustomerWithdrawalRequestApprovalComponent } from '../ui/customer-withdrawal-request-approval/customer-withdrawal-request-approval.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { UtilsPipeModule } from 'src/app/utils/pipe/module/utils-pipe.module';

@NgModule({
  declarations: [
    CustomerWithdrawalRequestComponent,
    CustomerWithdrawalRequestApprovalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerWithdrawalRequestRoutingModule,

    UtilsPipeModule,

    // Translate
    TranslateModule,

    // PrimeNG
    ButtonModule,
    DropdownModule,
    InputMaskModule,
    TableModule
  ],
  exports: [
    CustomerWithdrawalRequestComponent,
    CustomerWithdrawalRequestApprovalComponent,
  ]
})
export class CustomerWithdrawalRequestModule { }

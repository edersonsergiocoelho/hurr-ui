import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentStatusRoutingModule } from './payment-status-routing.module';
import { PaymentStatusComponent } from '../ui/payment-status/payment-status.component';
import { PaymentStatusSearchComponent } from '../ui/payment-status-search/payment-status-search.component';
import { PaymentStatusRegisterComponent } from '../ui/payment-status-register/payment-status-register.component';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { UtilsPipeModule } from 'src/app/utils/pipe/module/utils-pipe.module';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  declarations: [
    PaymentStatusComponent,
    PaymentStatusSearchComponent,
    PaymentStatusRegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentStatusRoutingModule,

    UtilsPipeModule,

    TranslateModule,

    // PrimeNG
    CalendarModule,
    TableModule, 
    SelectButtonModule,
    InputTextModule,
    InputSwitchModule,
    ToolbarModule
  ]
})
export class PaymentStatusModule { }

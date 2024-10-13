import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EarningsRoutingModule } from './earnings-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

import { EarningsComponent } from '../ui/earnings/earnings.component';
import { EarningsResumeComponent } from '../ui/earnings-resume/earnings-resume.component';
import { EarningsCustomerVehicleWithdrawalRequestComponent } from '../ui/earnings-customer-vehicle-withdrawal-request/earnings-customer-vehicle-withdrawal-request.component';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    EarningsComponent,
    EarningsResumeComponent,
    EarningsCustomerVehicleWithdrawalRequestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EarningsRoutingModule,

    ButtonModule,
    CheckboxModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    TagModule,
    TranslateModule
  ],
  exports: [
    EarningsComponent,
    EarningsResumeComponent,
    EarningsCustomerVehicleWithdrawalRequestComponent
  ]
})
export class EarningsModule { }

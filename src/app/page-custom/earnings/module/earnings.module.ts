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
import { EarningsCustomerWithdrawalRequestComponent } from '../ui/earnings-customer-withdrawal-request/earnings-customer-withdrawal-request.component';

@NgModule({
  declarations: [
    EarningsComponent,
    EarningsResumeComponent,
    EarningsCustomerWithdrawalRequestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EarningsRoutingModule,

    ButtonModule,
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
    EarningsCustomerWithdrawalRequestComponent
  ]
})
export class EarningsModule { }

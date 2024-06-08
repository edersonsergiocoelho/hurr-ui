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

import { EarningsComponent } from '../ui/earnings/earnings.component';
import { EarningsResumeComponent } from '../ui/earnings-resume/earnings-resume.component';
import { EarningsCustomerWithdrawalRequestsComponent } from '../ui/earnings-customer-withdrawal-requests/earnings-customer-withdrawal-requests.component';

@NgModule({
  declarations: [
    EarningsComponent,
    EarningsResumeComponent,
    EarningsCustomerWithdrawalRequestsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EarningsRoutingModule,

    DialogModule,
    RadioButtonModule,
    TranslateModule,
    MenuModule
  ],
  exports: [
    EarningsComponent,
    EarningsResumeComponent,
    EarningsCustomerWithdrawalRequestsComponent
  ]
})
export class EarningsModule { }

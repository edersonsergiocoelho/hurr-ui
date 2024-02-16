import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerValidationRoutingModule } from './customer-validation-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerValidationComponent } from '../ui/customer-validation/customer-validation.component';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CustomerValidationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerValidationRoutingModule,

    TranslateModule,

    // PrimeNG
    ButtonModule,
    CalendarModule,
    FileUploadModule, 
    InputTextModule,
    InputMaskModule,
    TooltipModule,
  ],
  exports: [
    CustomerValidationComponent
  ]
})
export class CustomerValidationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerValidationRoutingModule } from './customer-validation-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerValidationComponent } from '../ui/customer-validation/customer-validation.component';

import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [CustomerValidationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerValidationRoutingModule,

    // PrimeNG
    ButtonModule,
    FileUploadModule, 
    InputTextModule,
    TooltipModule,
  ]
})
export class CustomerValidationModule { }

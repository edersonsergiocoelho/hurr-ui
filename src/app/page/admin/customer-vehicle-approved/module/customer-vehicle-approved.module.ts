import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerVehicleApprovedRoutingModule } from './customer-vehicle-approved-routing.module';

import { CustomerVehicleApprovedComponent } from '../ui/customer-vehicle-approved/customer-vehicle-approved.component';
import { CustomerVehicleApprovedSearchComponent } from '../ui/customer-vehicle-approved-search/customer-vehicle-approved-search.component';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ImageModule } from 'primeng/image';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [
    CustomerVehicleApprovedComponent,
    CustomerVehicleApprovedSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerVehicleApprovedRoutingModule,

    // Translate
    TranslateModule,

    // PrimeNg
    ButtonModule,
    CalendarModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    InputSwitchModule,
    ImageModule,
    SelectButtonModule,
    TableModule
  ], 
  exports: [
    CustomerVehicleApprovedComponent,
    CustomerVehicleApprovedSearchComponent
  ]
})
export class CustomerVehicleApprovedModule { }

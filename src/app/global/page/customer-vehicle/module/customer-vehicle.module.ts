import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerVehicleRoutingModule } from './customer-vehicle-routing.module';

import { TranslateModule } from '@ngx-translate/core';

import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';

import { CustomerVehicleComponent } from '../ui/customer-vehicle/customer-vehicle.component';
import { CustomerVehicleDetailComponent } from '../ui/customer-vehicle-detail/customer-vehicle-detail.component';
import { CustomerVehicleSearchComponent } from '../ui/customer-vehicle-search/customer-vehicle-search.component';
import { CustomerVehicleRegisterComponent } from '../ui/customer-vehicle-register/customer-vehicle-register.component';
import { CustomerVehicleRegisterStep1Component } from '../ui/customer-vehicle-register-step1/customer-vehicle-register-step1.component';
import { CustomerVehicleRegisterStep2Component } from '../ui/customer-vehicle-register-step2/customer-vehicle-register-step2.component';

@NgModule({
  declarations: [
    CustomerVehicleComponent,
    CustomerVehicleDetailComponent,
    CustomerVehicleSearchComponent,
    CustomerVehicleRegisterComponent,
    CustomerVehicleRegisterStep1Component,
    CustomerVehicleRegisterStep2Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerVehicleRoutingModule,

    TranslateModule,

    ButtonModule,
    CalendarModule,
    DataViewModule,
    DropdownModule,
    DividerModule,
    GalleriaModule,
    RatingModule,
    InputTextModule,
    ToastModule
  ],
  exports: [
    CustomerVehicleComponent,
    CustomerVehicleDetailComponent,
    CustomerVehicleSearchComponent,
    CustomerVehicleRegisterComponent,
    CustomerVehicleRegisterStep1Component,
    CustomerVehicleRegisterStep2Component
  ]
})
export class CustomerVehicleModule { }

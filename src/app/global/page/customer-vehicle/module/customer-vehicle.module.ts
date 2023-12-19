import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GalleriaModule } from 'primeng/galleria';

import { CustomerVehicleRoutingModule } from './customer-vehicle-routing.module';
import { CustomerVehicleDetailComponent } from '../ui/customer-vehicle-detail/customer-vehicle-detail.component';
import { HomeModule } from '../../home/module/home.module';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [CustomerVehicleDetailComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerVehicleRoutingModule,

    ButtonModule,
    CalendarModule,
    DropdownModule,
    GalleriaModule
  ],
  exports: [
    CustomerVehicleDetailComponent
  ]
})
export class CustomerVehicleModule { }

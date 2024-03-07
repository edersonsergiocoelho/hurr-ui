import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CustomerVehicleBookingRoutingModule } from './customer-vehicle-booking-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerVehicleBookingSuccessComponent } from '../ui/customer-vehicle-booking-success/customer-vehicle-booking-success.component';
import { CustomerVehicleBookingComponent } from '../ui/customer-vehicle-booking/customer-vehicle-booking.component';
import { CustomerVehicleBookingSearchComponent } from '../ui/customer-vehicle-booking-search/customer-vehicle-booking-search.component';
import { DividerModule } from 'primeng/divider';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    CustomerVehicleBookingSuccessComponent,
    CustomerVehicleBookingComponent,
    CustomerVehicleBookingSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerVehicleBookingRoutingModule,

    TranslateModule,

    // PrimeNG
    DataViewModule,
    DividerModule,
    DropdownModule,
    RatingModule,
    TagModule
  ], 
  exports: [
    CustomerVehicleBookingSuccessComponent,
    CustomerVehicleBookingComponent,
    CustomerVehicleBookingSearchComponent
  ]
})
export class CustomerVehicleBookingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CustomerVehicleBookingRoutingModule } from './customer-vehicle-booking-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';

import { CustomerVehicleBookingComponent } from '../ui/customer-vehicle-booking/customer-vehicle-booking.component';
import { CustomerVehicleBookingSearchComponent } from '../ui/customer-vehicle-booking-search/customer-vehicle-booking-search.component';
import { CustomerVehicleBookingSuccessComponent } from '../ui/customer-vehicle-booking-success/customer-vehicle-booking-success.component';
import { CustomerVehicleBookingCustomerVehicleComponent } from '../ui/customer-vehicle-booking-customer-vehicle/customer-vehicle-booking-customer-vehicle.component';
import { CustomerVehicleBookingCustomerVehicleSearchComponent } from '../ui/customer-vehicle-booking-customer-vehicle-search/customer-vehicle-booking-customer-vehicle-search.component';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialogComponent } from '../ui/customer-vehicle-booking-customer-vehicle-check-out-dynamic-dialog/customer-vehicle-booking-customer-vehicle-check-out-dynamic-dialog.component';
import { CustomerVehicleBookingCustomerVehicleCheckInDynamicDialogComponent } from '../ui/customer-vehicle-booking-customer-vehicle-check-in-dynamic-dialog/customer-vehicle-booking-customer-vehicle-check-in-dynamic-dialog.component';

@NgModule({
  declarations: [
    CustomerVehicleBookingComponent,
    CustomerVehicleBookingSearchComponent,
    CustomerVehicleBookingSuccessComponent,
    CustomerVehicleBookingCustomerVehicleComponent,
    CustomerVehicleBookingCustomerVehicleCheckInDynamicDialogComponent,
    CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialogComponent,
    CustomerVehicleBookingCustomerVehicleSearchComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerVehicleBookingRoutingModule,

    // NgxTranslate
    TranslateModule,

    // PrimeNG
    ButtonModule,
    ConfirmDialogModule,
    DataViewModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    OverlayPanelModule,
    SelectButtonModule,
    RatingModule
  ], 
  exports: [
    CustomerVehicleBookingComponent,
    CustomerVehicleBookingSearchComponent,
    CustomerVehicleBookingCustomerVehicleCheckInDynamicDialogComponent,
    CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialogComponent,
    CustomerVehicleBookingSuccessComponent,
    CustomerVehicleBookingCustomerVehicleComponent,
    CustomerVehicleBookingCustomerVehicleSearchComponent
  ],
  providers: [
    DialogService
  ]
})
export class CustomerVehicleBookingModule { }

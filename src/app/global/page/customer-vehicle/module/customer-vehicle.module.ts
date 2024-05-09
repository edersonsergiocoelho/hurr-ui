import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerVehicleRoutingModule } from './customer-vehicle-routing.module';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';

import { CustomerVehicleDetailComponent } from '../ui/customer-vehicle-detail/customer-vehicle-detail.component';

import { DateFormatDDMMMMYYYYBR } from 'src/app/utils/pipe/date/date-format-dd-mmmm-yyyy-br';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CustomerVehicleDetailComponent, DateFormatDDMMMMYYYYBR],
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
    DropdownModule,
    DividerModule,
    GalleriaModule,
    RatingModule,
    ToastModule
  ],
  exports: [
    CustomerVehicleDetailComponent
  ]
})
export class CustomerVehicleModule { }

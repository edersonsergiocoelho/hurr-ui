import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '../ui/home/home.component';
import { HomeSearchCarsComponent } from '../ui/home-search-cars/home-search-cars.component';
import { HomeSearchCarsDetailComponent } from '../ui/home-search-cars-detail/home-search-cars-detail.component';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [HomeComponent, HomeSearchCarsComponent, HomeSearchCarsDetailComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,

    NgxSpinnerModule,
    GoogleMapsModule,

    ButtonModule,
    CalendarModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    MenuModule,
    MultiSelectModule,
    RatingModule,
    ToggleButtonModule,
    ToastModule
  ],
  exports: [
    HomeComponent,
    HomeSearchCarsComponent,
    HomeSearchCarsDetailComponent
  ],
  providers: [
    DecimalPipe, 
    MessageService
  ]
})
export class HomeModule { }

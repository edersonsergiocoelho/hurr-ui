import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '../ui/home/home.component';
import { HomeSearchCarsComponent } from '../ui/home-search-cars/home-search-cars.component';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MegaMenuModule } from 'primeng/megamenu';



@NgModule({
  declarations: [HomeComponent, HomeSearchCarsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,

    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    MenuModule,
    MegaMenuModule
  ],
  exports: [
    HomeComponent,
    HomeSearchCarsComponent
  ]
})
export class HomeModule { }

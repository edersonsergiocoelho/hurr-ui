import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckOutMPComponent } from '../ui/check-out-mp/checkout-mp.component';
import { CheckOutMPRoutingModule } from './check-out-mp-routing.module';


@NgModule({
  declarations: [
    CheckOutMPComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckOutMPRoutingModule
  ],
  exports: [
    CheckOutMPComponent
  ]
})
export class CheckOutMPModule { }

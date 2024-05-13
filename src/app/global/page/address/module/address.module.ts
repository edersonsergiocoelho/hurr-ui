import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressRoutingModule } from './address-routing.module';
import { AddressDynamicDialogComponent } from '../ui/address-dynamic-dialog/address-dynamic-dialog.component';
import { AddressRegisterDynamicDialogComponent } from '../ui/address-register-dynamic-dialog/address-register-dynamic-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    AddressDynamicDialogComponent,
    AddressRegisterDynamicDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddressRoutingModule,

    TranslateModule,

    CalendarModule,
    DropdownModule,
    InputSwitchModule,
    InputMaskModule, 
    InputTextModule,
    MultiSelectModule
  ],
  exports: [
    AddressDynamicDialogComponent,
    AddressRegisterDynamicDialogComponent
  ]
})
export class AddressModule { }

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
import { UtilsPipeModule } from 'src/app/utils/pipe/module/utils-pipe.module';
import { CustomerVehicleApprovedDetailComponent } from '../ui/customer-vehicle-approved-detail/customer-vehicle-approved-detail.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    CustomerVehicleApprovedComponent,
    CustomerVehicleApprovedSearchComponent,
    CustomerVehicleApprovedDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerVehicleApprovedRoutingModule,

    UtilsPipeModule,

    // Translate
    TranslateModule,

    // PrimeNg
    ButtonModule,
    CalendarModule,
    DividerModule,
    DropdownModule,
    GalleriaModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    InputSwitchModule,
    InputNumberModule,
    ImageModule,
    SelectButtonModule,
    TableModule
  ], 
  exports: [
    CustomerVehicleApprovedComponent,
    CustomerVehicleApprovedSearchComponent,
    CustomerVehicleApprovedDetailComponent
  ]
})
export class CustomerVehicleApprovedModule { }

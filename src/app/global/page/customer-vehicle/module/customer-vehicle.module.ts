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
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';

import { CustomerVehicleComponent } from '../ui/customer-vehicle/customer-vehicle.component';
import { CustomerVehicleDetailComponent } from '../ui/customer-vehicle-detail/customer-vehicle-detail.component';
import { CustomerVehicleSearchComponent } from '../ui/customer-vehicle-search/customer-vehicle-search.component';
import { CustomerVehicleRegisterComponent } from '../ui/customer-vehicle-register/customer-vehicle-register.component';
import { CustomerVehicleRegisterStep1Component } from '../ui/customer-vehicle-register-step1/customer-vehicle-register-step1.component';
import { CustomerVehicleRegisterStep2Component } from '../ui/customer-vehicle-register-step2/customer-vehicle-register-step2.component';
import { CustomerVehicleRegisterStep3Component } from '../ui/customer-vehicle-register-step3/customer-vehicle-register-step3.component';
import { CustomerVehicleRegisterStep4Component } from '../ui/customer-vehicle-register-step4/customer-vehicle-register-step4.component';
import { CustomerVehicleRegisterStep5Component } from '../ui/customer-vehicle-register-step5/customer-vehicle-register-step5.component';

@NgModule({
  declarations: [
    CustomerVehicleComponent,
    CustomerVehicleDetailComponent,
    CustomerVehicleSearchComponent,
    CustomerVehicleRegisterComponent,
    CustomerVehicleRegisterStep1Component,
    CustomerVehicleRegisterStep2Component,
    CustomerVehicleRegisterStep3Component,
    CustomerVehicleRegisterStep4Component,
    CustomerVehicleRegisterStep5Component
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
    RadioButtonModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    ToastModule
  ],
  exports: [
    CustomerVehicleComponent,
    CustomerVehicleDetailComponent,
    CustomerVehicleSearchComponent,
    CustomerVehicleRegisterComponent,
    CustomerVehicleRegisterStep1Component,
    CustomerVehicleRegisterStep2Component,
    CustomerVehicleRegisterStep3Component,
    CustomerVehicleRegisterStep4Component,
    CustomerVehicleRegisterStep5Component
  ]
})
export class CustomerVehicleModule { }

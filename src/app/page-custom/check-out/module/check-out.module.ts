import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckOutRoutingModule } from './check-out-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Component
import { CheckOutComponent } from '../ui/check-out/check-out.component';

// Module
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RateUtilsService } from 'src/app/utils/service/rate-utils-service';
import { CheckOutMPModule } from '../../check-out-mp/module/check-out-mp.module';

@NgModule({
  declarations: [
    CheckOutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckOutRoutingModule,
    CheckOutMPModule,

    TranslateModule,

    // PrimeNG
    DynamicDialogModule,
    InputTextModule,
    InputNumberModule
  ],
  exports: [
    CheckOutComponent
  ],
  providers: [
    RateUtilsService
  ]
})
export class CheckOutModule { }

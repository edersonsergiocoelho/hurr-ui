import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Component
import { CheckoutComponent } from '../ui/checkout/checkout.component';

// Module
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckoutMercadoPagoModule } from '../../checkout-mercado-pago/module/checkout-mercado-pago.module';
import { RateUtilsService } from 'src/app/utils/service/rate-utils-service';

@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckoutRoutingModule,
    CheckoutMercadoPagoModule,

    TranslateModule,

    // PrimeNG
    DynamicDialogModule,
    InputTextModule,
    InputNumberModule
  ],
  exports: [
    CheckoutComponent
  ],
  providers: [
    RateUtilsService
  ]
})
export class CheckoutModule { }

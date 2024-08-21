import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpBackend, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { authInterceptorProviders } from './core/auth/interceptor/auth.interceptor';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

// Page
import { GlobalPageModule } from './global/page/module/global-page.module';
import { GlobalTemplateModule } from './global/template/module/global-template.module';
import { PageModule } from './page/module/page.module';
import { PageAdminModule } from './page/admin/module/page-admin.module';
import { PageCustomModule } from './page-custom/module/page-custom.module';
import { UtilsPipeModule } from './utils/pipe/module/utils-pipe.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(_httpBackend: HttpBackend) {
  return new MultiTranslateHttpLoader(_httpBackend,
  [
  '/assets/i18n/generic/button/',
  '/assets/i18n/generic/currency/',
  '/assets/i18n/generic/label/',
  '/assets/i18n/generic/table/',
  '/assets/i18n/generic/message/',
  '/assets/i18n/address/',
  '/assets/i18n/checkout/',
  '/assets/i18n/customer-validation/',
  
  // CustomerVehicle
  '/assets/i18n/customer-vehicle/customer-vehicle-detail/',
  '/assets/i18n/customer-vehicle/customer-vehicle-edit/',
  '/assets/i18n/customer-vehicle/customer-vehicle-edit-addresses/',
  '/assets/i18n/customer-vehicle/customer-vehicle-edit-addresses-register/',
  '/assets/i18n/customer-vehicle/customer-vehicle-edit-addresses-search/',
  '/assets/i18n/customer-vehicle/customer-vehicle-edit-advertisement-status/',
  '/assets/i18n/customer-vehicle/customer-vehicle-edit-detail/',
  '/assets/i18n/customer-vehicle/customer-vehicle-edit-limited-mileage/',
  '/assets/i18n/customer-vehicle/customer-vehicle-edit-photos/',
  '/assets/i18n/customer-vehicle/customer-vehicle-edit-price-discount/',
  '/assets/i18n/customer-vehicle/customer-vehicle-register/',
  '/assets/i18n/customer-vehicle/customer-vehicle-register-step1/',
  '/assets/i18n/customer-vehicle/customer-vehicle-register-step2/',
  '/assets/i18n/customer-vehicle/customer-vehicle-register-step3/',
  '/assets/i18n/customer-vehicle/customer-vehicle-register-step4/',
  '/assets/i18n/customer-vehicle/customer-vehicle-register-step5/',
  '/assets/i18n/customer-vehicle/customer-vehicle-register-step6/',
  '/assets/i18n/customer-vehicle/customer-vehicle-register-step7/',
  '/assets/i18n/customer-vehicle/customer-vehicle-search/',

  // CustomerVehicleApproved
  '/assets/i18n/customer-vehicle-approved/customer-vehicle-approved-search/',
  '/assets/i18n/customer-vehicle-approved/customer-vehicle-approved-detail/',

  // CustomerVehicleBooking
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-customer-vehicle-finalize-booking-dynamic-dialog/',
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-customer-vehicle-search/',
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-search/',
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-success/',

  '/assets/i18n/customer-withdrawal-request/customer-withdrawal-request-approval/',

  // Earnings
  '/assets/i18n/earnings/earnings/',
  '/assets/i18n/earnings/earnings-customer-withdrawal-request/',
  '/assets/i18n/earnings/earnings-resume/',

  '/assets/i18n/file-approved/',
  
  // Home
  '/assets/i18n/home/home/',
  '/assets/i18n/home/home-search-cars/',
  '/assets/i18n/home/home-search-cars-detail/',

  '/assets/i18n/role/',
  '/assets/i18n/user/',
  '/assets/i18n/user-role/'
  ]);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,

    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpBackend]
      }
    }),

    GoogleMapsModule,
    NgxSpinnerModule,

    UtilsPipeModule,

    GlobalPageModule,
    GlobalTemplateModule,

    PageModule,
    PageAdminModule,
    PageCustomModule
  ],
  providers: [{ provide: Window, useValue: window }, authInterceptorProviders],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

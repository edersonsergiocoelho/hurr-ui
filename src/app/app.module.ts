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

// AoT requires an exported function for factories
export function HttpLoaderFactory(_httpBackend: HttpBackend) {
  return new MultiTranslateHttpLoader(_httpBackend,
  [
  '/assets/i18n/generic/button/',
  '/assets/i18n/generic/currency/',
  '/assets/i18n/generic/table/',
  '/assets/i18n/generic/message/',
  '/assets/i18n/address/',
  '/assets/i18n/checkout/',
  '/assets/i18n/customer-validation/',
  '/assets/i18n/customer-vehicle/',
  
  // CustomerVehicleBooking
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-customer-vehicle-finalize-booking-dynamic-dialog/',
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-customer-vehicle-search/',
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-search/',
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-success/',

  '/assets/i18n/earnings/',
  '/assets/i18n/file-approved/',
  '/assets/i18n/home/',
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

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
  // Generic's
  '/assets/i18n/generic/confirmation/',
  '/assets/i18n/generic/currency/',
  '/assets/i18n/generic/label/',
  '/assets/i18n/generic/message/',
  '/assets/i18n/generic/placeholder/',
  '/assets/i18n/generic/small/',
  '/assets/i18n/generic/span/',
  '/assets/i18n/generic/table/',
  '/assets/i18n/generic/tooltip/',

  // Address
  '/assets/i18n/address/',

  // Bank
  '/assets/i18n/bank/bank/',
  '/assets/i18n/bank/bank-search/',
  '/assets/i18n/bank/bank-register/',

  // Checkout
  '/assets/i18n/checkout/checkout/',

  // CustomerValidation
  '/assets/i18n/customer-validation/customer-validation/',
  
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
  // CustomerVehicleBooking - CustomerVehicle
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-customer-vehicle-check-in-dynamic-dialog/',
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-customer-vehicle-check-out-dynamic-dialog/',
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-customer-vehicle-search/',
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-customer-vehicle-view-invoice/',
  
  // CustomerVehicleBooking - Customer
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-search/',
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-success/',
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-view-invoice/',
  '/assets/i18n/customer-vehicle-booking/customer-vehicle-booking-view-reservation/',

  // CustomerVehicleBankAccount
  '/assets/i18n/customer-vehicle-bank-account/customer-vehicle-bank-account/',
  '/assets/i18n/customer-vehicle-bank-account/customer-vehicle-bank-account-search/',
  '/assets/i18n/customer-vehicle-bank-account/customer-vehicle-bank-account-register/',

  // CustomerVehicleWithdrawalRequest
  '/assets/i18n/customer-vehicle-withdrawal-request/customer-vehicle-withdrawal-request/',
  '/assets/i18n/customer-vehicle-withdrawal-request/customer-vehicle-withdrawal-request-approval/',

  // Earnings
  '/assets/i18n/earnings/earnings/',
  '/assets/i18n/earnings/earnings-customer-vehicle-withdrawal-request/',
  '/assets/i18n/earnings/earnings-resume/',

  // FileApproved
  '/assets/i18n/file-approved/file-approved/',
  '/assets/i18n/file-approved/file-detail/',
  '/assets/i18n/file-approved/file-search/',
  
  // Home
  '/assets/i18n/home/home/',
  '/assets/i18n/home/home-search-cars/',
  '/assets/i18n/home/home-search-cars-detail/',

  // PaymentMethod
  '/assets/i18n/payment-method/payment-method/',
  '/assets/i18n/payment-method/payment-method-search/',
  '/assets/i18n/payment-method/payment-method-register/',

  // PaymentStatus
  '/assets/i18n/payment-status/payment-status/',
  '/assets/i18n/payment-status/payment-status-search/',
  '/assets/i18n/payment-status/payment-status-register/',

  // Role
  '/assets/i18n/role/role/',
  '/assets/i18n/role/role-register/',
  '/assets/i18n/role/role-search/',

  // User
  '/assets/i18n/user/user-forgot-password/',
  '/assets/i18n/user/user-login/',
  '/assets/i18n/user/user-profile/user-profile/',
  '/assets/i18n/user/user-profile/user-profile-content/',
  '/assets/i18n/user/user-register/',

  // UserPreference
  '/assets/i18n/user-preference/user-preference/user-preference/',
  '/assets/i18n/user-preference/user-preference/user-preference-content/',

  // UserRole
  '/assets/i18n/user-role/',
  '/assets/i18n/user-role/user-role-edit-role/'
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

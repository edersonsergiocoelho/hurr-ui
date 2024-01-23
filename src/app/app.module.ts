import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpBackend, HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

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
  ['/assets/i18n/generic/button/',
  '/assets/i18n/role/']);
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
  providers: [authInterceptorProviders],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

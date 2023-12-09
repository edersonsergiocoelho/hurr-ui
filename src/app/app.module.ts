import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { GlobalPageModule } from './global/page/module/global-page.module';
import { GlobalTemplateModule } from './global/template/module/global-template.module';
import { PageModule } from './page/module/page.module';

import { authInterceptorProviders } from './core/auth/interceptor/auth.interceptor';
import { PageAdminModule } from './page/admin/module/page-admin.module';

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

    GlobalPageModule,
    GlobalTemplateModule,

    PageModule,
    PageAdminModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

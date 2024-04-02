import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserLoginComponent } from '../ui/user-login/user-login.component';

import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { UserRegisterComponent } from '../ui/user-register/user-register.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OverlayModule } from 'primeng/overlay';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,

    // NgxTranslate
    TranslateModule,

    // PrimeNG
    CarouselModule,
    CheckboxModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    InputSwitchModule,
    FileUploadModule,
    OverlayModule
  ],
  exports: [
    UserLoginComponent,
    UserRegisterComponent
  ]
})
export class UserModule { }

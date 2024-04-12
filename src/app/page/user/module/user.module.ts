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
import { TagModule } from 'primeng/tag';
import { UserForgotPasswordComponent } from '../ui/user-forgot-password/user-forgot-password.component';

@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
    UserForgotPasswordComponent
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
    FileUploadModule,
    InputSwitchModule,
    InputTextModule,
    OverlayModule,
    TagModule 
  ],
  exports: [
    UserLoginComponent,
    UserRegisterComponent,
    UserForgotPasswordComponent
  ]
})
export class UserModule { }

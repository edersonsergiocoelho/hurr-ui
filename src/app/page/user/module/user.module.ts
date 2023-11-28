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

@NgModule({
  declarations: [UserLoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,

    // PrimeNG
    CarouselModule,
    CheckboxModule,
    DividerModule

  ],
  exports: [
    UserLoginComponent
  ]
})
export class UserModule { }

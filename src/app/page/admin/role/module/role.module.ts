import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

// Component
import { RoleComponent } from '../ui/role/role.component';
import { RoleSearchComponent } from '../ui/role-search/role-search.component';
import { RoleRegisterComponent } from '../ui/role-register/role-register.component';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    RoleComponent,
    RoleSearchComponent,
    RoleRegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoleRoutingModule,

    TranslateModule,

    //PrimeNG
    ButtonModule,
    CalendarModule,
    DividerModule,
    InputTextModule,
    InputSwitchModule,
    SelectButtonModule,
    TableModule
  ]
})
export class RoleModule { }

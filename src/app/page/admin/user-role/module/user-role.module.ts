import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoleRoutingModule } from './user-role-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoleComponent } from '../ui/user-role/user-role.component';
import { UserRoleSearchComponent } from '../ui/user-role-search/user-role-search.component';
import { UserRoleRegisterComponent } from '../ui/user-role-register/user-role-register.component';
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    UserRoleComponent,
    UserRoleSearchComponent,
    UserRoleRegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoleRoutingModule,

    TranslateModule,

    //PrimeNG
    ButtonModule,
    CalendarModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    InputSwitchModule,
    SelectButtonModule,
    TableModule
  ]
})
export class UserRoleModule { }

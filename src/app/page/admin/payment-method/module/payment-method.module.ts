import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentMethodRoutingModule } from './payment-method-routing.module';
import { PaymentMethodComponent } from '../ui/payment-method/payment-method.component';
import { PaymentMethodSearchComponent } from '../ui/payment-method-search/payment-method-search.component';
import { PaymentMethodRegisterComponent } from '../ui/payment-method-register/payment-method-register.component';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { UtilsPipeModule } from 'src/app/utils/pipe/module/utils-pipe.module';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    PaymentMethodComponent,
    PaymentMethodSearchComponent,
    PaymentMethodRegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentMethodRoutingModule,

    UtilsPipeModule,

    TranslateModule,

    // PrimeNG
    ButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    FileUploadModule,
    TableModule, 
    SelectButtonModule,
    InputTextModule,
    InputSwitchModule,
    SidebarModule,
    ToolbarModule,
    TooltipModule
  ]
})
export class PaymentMethodModule { }

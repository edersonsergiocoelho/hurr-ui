import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { PaymentMethodComponent } from '../ui/payment-method/payment-method.component';
import { PaymentMethodSearchComponent } from '../ui/payment-method-search/payment-method-search.component';
import { PaymentMethodRegisterComponent } from '../ui/payment-method-register/payment-method-register.component';

// Roteamento
import { PaymentMethodRoutingModule } from './payment-method-routing.module';

// Módulos do PrimeNG
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

// Outros Módulos
import { TranslateModule } from '@ngx-translate/core';
import { UtilsPipeModule } from 'src/app/utils/pipe/module/utils-pipe.module';

@NgModule({
  declarations: [
    PaymentMethodComponent,
    PaymentMethodRegisterComponent,
    PaymentMethodSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentMethodRoutingModule,

    // Módulos do PrimeNG
    ButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    FileUploadModule,
    InputSwitchModule,
    InputTextModule,
    SelectButtonModule,
    SidebarModule,
    TableModule,
    ToolbarModule,
    TooltipModule,

    // Outros Módulos
    TranslateModule,
    UtilsPipeModule
  ]
})
export class PaymentMethodModule { }

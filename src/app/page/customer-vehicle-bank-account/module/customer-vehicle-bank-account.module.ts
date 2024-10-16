import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { CustomerVehicleBankAccountComponent } from '../ui/customer-vehicle-bank-account/customer-vehicle-bank-account.component';
import { CustomerVehicleBankAccountSearchComponent } from '../ui/customer-vehicle-bank-account-search/customer-vehicle-bank-account-search.component';
import { CustomerVehicleBankAccountRegisterComponent } from '../ui/customer-vehicle-bank-account-register/customer-vehicle-bank-account-register.component';

// Roteamento
import { CustomerVehicleBankAccountRoutingModule } from './customer-vehicle-bank-account-routing.module';

// Módulos do PrimeNG
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
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
    CustomerVehicleBankAccountComponent,
    CustomerVehicleBankAccountRegisterComponent,
    CustomerVehicleBankAccountSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerVehicleBankAccountRoutingModule,

    // Módulos do PrimeNG
    ButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    DropdownModule,
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
export class CustomerVehicleBankAccountModule { }

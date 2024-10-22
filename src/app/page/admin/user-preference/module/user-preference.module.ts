import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { UserPreferenceComponent } from '../ui/user-preference/user-preference.component';
import { UserPreferenceContentComponent } from '../ui/user-preference-content/user-preference-content.component';

// Roteamento
import { UserPreferenceRoutingModule } from './user-preference-routing.module';

// Módulos do PrimeNG
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
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
    UserPreferenceComponent,
    UserPreferenceContentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserPreferenceRoutingModule,

    // Módulos do PrimeNG
    ButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    DropdownModule,
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
export class UserPreferenceModule { }

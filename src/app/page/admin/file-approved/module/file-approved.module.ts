import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileApprovedRoutingModule } from './file-approved-routing.module';

import { FileApprovedComponent } from '../ui/file-approved/file-approved.component';
import { FileApprovedSearchComponent } from '../ui/file-approved-search/file-approved-search.component';
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ImageModule } from 'primeng/image';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { FileApprovedDetailComponent } from '../ui/file-approved-detail/file-approved-detail.component';

@NgModule({
  declarations: [
    FileApprovedComponent, 
    FileApprovedSearchComponent,
    FileApprovedDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileApprovedRoutingModule,

    TranslateModule,

    //PrimeNG
    ButtonModule,
    CalendarModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    InputSwitchModule,
    ImageModule,
    SelectButtonModule,
    TableModule
  ], 
  exports: [
    FileApprovedComponent, 
    FileApprovedSearchComponent,
    FileApprovedDetailComponent
  ]
})
export class FileApprovedModule { }

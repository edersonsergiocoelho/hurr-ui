import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerValidationModule } from '../customer-validation/module/customer-validation.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Modules - PageCustomModule
    CustomerValidationModule
  ], exports: [
    CustomerValidationModule
  ]
})
export class PageCustomModule { }

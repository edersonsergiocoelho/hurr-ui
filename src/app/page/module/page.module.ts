import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from '../user/module/user.module';
import { PageAdminModule } from '../admin/module/page-admin.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Modules - PageModule
    UserModule
  ], 
  exports: [
    UserModule
  ]
})
export class PageModule { }

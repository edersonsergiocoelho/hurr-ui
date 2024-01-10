import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerValidationComponent } from '../ui/customer-validation/customer-validation.component';

const routes: Routes = [
  {path: 'customer/customer-validation', component: CustomerValidationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerValidationRoutingModule { }

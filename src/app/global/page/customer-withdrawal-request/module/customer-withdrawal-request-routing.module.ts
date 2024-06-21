import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerWithdrawalRequestComponent } from '../ui/customer-withdrawal-request/customer-withdrawal-request.component';

const routes: Routes = [
  {path: 'customer-withdrawal-request-approval', component: CustomerWithdrawalRequestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerWithdrawalRequestRoutingModule { }
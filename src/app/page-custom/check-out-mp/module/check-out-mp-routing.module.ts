import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutMPComponent } from '../ui/check-out-mp/check-out-mp.component';

const routes: Routes = [
  {path: 'checkout/mp', component: CheckOutMPComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckOutMPRoutingModule { }

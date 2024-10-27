import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeComponent } from '../ui/fee/fee.component';

const routes: Routes = [
  {path: 'fee', component: FeeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeRoutingModule { }

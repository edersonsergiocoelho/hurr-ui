import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarningsComponent } from '../ui/earnings/earnings.component';

const routes: Routes = [
  {path: 'earnings', component: EarningsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EarningsRoutingModule { }

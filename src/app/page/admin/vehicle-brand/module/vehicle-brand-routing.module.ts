import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleBrandComponent } from '../ui/vehicle-brand/vehicle-brand.component';

const routes: Routes = [
  {path: 'vehicle-brand', component: VehicleBrandComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleBrandRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerVehicleSearchComponent } from '../ui/customer-vehicle-search/customer-vehicle-search.component';
import { CustomerVehicleDetailComponent } from '../ui/customer-vehicle-detail/customer-vehicle-detail.component';
import { CustomerVehicleRegisterComponent } from '../ui/customer-vehicle-register/customer-vehicle-register.component';
import { CustomerVehicleEditComponent } from '../ui/customer-vehicle-edit/customer-vehicle-edit.component';
import { CustomerVehicleEditPhotosComponent } from '../ui/customer-vehicle-edit-photos/customer-vehicle-edit-photos.component';

const routes: Routes = [
  {path: 'customer-vehicle', component: CustomerVehicleSearchComponent},
  {path: 'customer-vehicle/register', component: CustomerVehicleRegisterComponent},
  {path: 'customer-vehicle/detail', component: CustomerVehicleDetailComponent},
  {path: 'customer-vehicle/edit/:customerVehicleId', component: CustomerVehicleEditComponent},
  {path: 'customer-vehicle/edit/photos', component: CustomerVehicleEditPhotosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerVehicleRoutingModule { }

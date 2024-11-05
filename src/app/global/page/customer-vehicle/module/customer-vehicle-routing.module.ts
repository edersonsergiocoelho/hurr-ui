import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerVehicleSearchComponent } from '../ui/customer-vehicle-search/customer-vehicle-search.component';
import { CustomerVehicleDetailComponent } from '../ui/customer-vehicle-detail/customer-vehicle-detail.component';
import { CustomerVehicleRegisterComponent } from '../ui/customer-vehicle-register/customer-vehicle-register.component';
import { CustomerVehicleEditPhotosComponent } from '../ui/customer-vehicle-edit-photos/customer-vehicle-edit-photos.component';
import { CustomerVehicleEditDetailComponent } from '../ui/customer-vehicle-edit-detail/customer-vehicle-edit-detail.component';
import { CustomerVehicleEditPriceDiscountComponent } from '../ui/customer-vehicle-edit-price-discount/customer-vehicle-edit-price-discount.component';
import { CustomerVehicleEditAddressesComponent } from '../ui/customer-vehicle-edit-addresses/customer-vehicle-edit-addresses.component';
import { CustomerVehicleEditLimitedMileageComponent } from '../ui/customer-vehicle-edit-limited-mileage/customer-vehicle-edit-limited-mileage.component';
import { CustomerVehicleEditAdvertisementStatusComponent } from '../ui/customer-vehicle-edit-advertisement-status/customer-vehicle-edit-advertisement-status.component';

const routes: Routes = [
  {path: 'customer-vehicle', component: CustomerVehicleSearchComponent},
  {path: 'customer-vehicle/register', component: CustomerVehicleRegisterComponent},
  {path: 'customer-vehicle/detail', component: CustomerVehicleDetailComponent},
  {path: 'customer-vehicle/edit/photos/:customerVehicleId', component: CustomerVehicleEditPhotosComponent},
  {path: 'customer-vehicle/edit/detail/:customerVehicleId', component: CustomerVehicleEditDetailComponent},
  {path: 'customer-vehicle/edit/price-discount/:customerVehicleId', component: CustomerVehicleEditPriceDiscountComponent},
  {path: 'customer-vehicle/edit/addresses/:customerVehicleId', component: CustomerVehicleEditAddressesComponent},
  {path: 'customer-vehicle/edit/limited-mileage/:customerVehicleId', component: CustomerVehicleEditLimitedMileageComponent},
  {path: 'customer-vehicle/edit/advertisement-status/:customerVehicleId', component: CustomerVehicleEditAdvertisementStatusComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerVehicleRoutingModule { }

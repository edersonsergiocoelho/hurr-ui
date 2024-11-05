import { Component, ViewChild } from '@angular/core';
import { VehicleBrandSearchComponent } from '../vehicle-brand-search/vehicle-brand-search.component';
import { VehicleBrandRegisterComponent } from '../vehicle-brand-register/vehicle-brand-register.component';

@Component({
  selector: 'app-vehicle-brand',
  templateUrl: './vehicle-brand.component.html',
  styleUrls: ['./vehicle-brand.component.css']
})
export class VehicleBrandComponent {

  sidebarSearchVisible: boolean = false;
  sidebarRegisterVisible: boolean = false;

  @ViewChild(VehicleBrandSearchComponent) vehicleBrandSearchComponent!: VehicleBrandSearchComponent;
  @ViewChild(VehicleBrandRegisterComponent) vehicleBrandRegisterComponent!: VehicleBrandRegisterComponent;

  // Método chamado no componente Search
  onRowSelectEdit(rowData: any) {
    this.vehicleBrandRegisterComponent.onRowSelectEdit(rowData);
  }

  delete(rowData: any) {
    this.vehicleBrandRegisterComponent.delete(rowData);
  }

  search() {
    this.vehicleBrandSearchComponent.search(null);
  }

  toggleSidebarSearch() {
    this.sidebarSearchVisible = !this.sidebarSearchVisible;
  }

  toggleSidebarRegister() {
    this.sidebarRegisterVisible = !this.sidebarRegisterVisible;
  }
}
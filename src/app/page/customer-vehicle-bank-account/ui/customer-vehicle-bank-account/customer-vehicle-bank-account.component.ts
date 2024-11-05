import { Component, ViewChild } from '@angular/core';
import { CustomerVehicleBankAccountSearchComponent } from '../customer-vehicle-bank-account-search/customer-vehicle-bank-account-search.component';
import { CustomerVehicleBankAccountRegisterComponent } from '../customer-vehicle-bank-account-register/customer-vehicle-bank-account-register.component';

@Component({
  selector: 'app-customer-vehicle-bank-account',
  templateUrl: './customer-vehicle-bank-account.component.html',
  styleUrls: ['./customer-vehicle-bank-account.component.css']
})
export class CustomerVehicleBankAccountComponent {

  sidebarSearchVisible: boolean = false;
  sidebarRegisterVisible: boolean = false;

  @ViewChild(CustomerVehicleBankAccountSearchComponent) customerVehicleBankAccountSearchComponent!: CustomerVehicleBankAccountSearchComponent;
  @ViewChild(CustomerVehicleBankAccountRegisterComponent) customerVehicleBankAccountRegisterComponent!: CustomerVehicleBankAccountRegisterComponent;

  // Método chamado no componente Search
  onRowSelectEdit(rowData: any) {
    this.customerVehicleBankAccountRegisterComponent.onRowSelectEdit(rowData);
  }

  delete(rowData: any) {
    this.customerVehicleBankAccountRegisterComponent.delete(rowData);
  }

  search() {
    this.customerVehicleBankAccountSearchComponent.search(null);
  }

  toggleSidebarSearch() {
    this.sidebarSearchVisible = !this.sidebarSearchVisible;
  }

  toggleSidebarRegister() {
    this.sidebarRegisterVisible = !this.sidebarRegisterVisible;
  }
}
import { Component, ViewChild } from '@angular/core';
import { FeeSearchComponent } from '../fee-search/fee-search.component';
import { FeeRegisterComponent } from '../fee-register/fee-register.component';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css']
})
export class FeeComponent {

  sidebarSearchVisible: boolean = false;
  sidebarRegisterVisible: boolean = false;

  @ViewChild(FeeSearchComponent) feeSearchComponent!: FeeSearchComponent;
  @ViewChild(FeeRegisterComponent) feeRegisterComponent!: FeeRegisterComponent;

  // Método chamado no componente Search
  onRowSelectEdit(rowData: any) {
    this.feeRegisterComponent.onRowSelectEdit(rowData);
  }

  delete(rowData: any) {
    this.feeRegisterComponent.delete(rowData);
  }

  search() {
    this.feeSearchComponent.search(null);
  }

  toggleSidebarSearch() {
    this.sidebarSearchVisible = !this.sidebarSearchVisible;
  }

  toggleSidebarRegister() {
    this.sidebarRegisterVisible = !this.sidebarRegisterVisible;
  }
}
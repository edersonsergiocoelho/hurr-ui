import { Component, ViewChild } from '@angular/core';
import { BankSearchComponent } from '../bank-search/bank-search.component';
import { BankRegisterComponent } from '../bank-register/bank-register.component';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent {

  sidebarSearchVisible: boolean = false;
  sidebarRegisterVisible: boolean = false;

  @ViewChild(BankSearchComponent) bankSearchComponent!: BankSearchComponent;
  @ViewChild(BankRegisterComponent) bankRegisterComponent!: BankRegisterComponent;

  // Método chamado no componente Search
  onRowSelectEdit(rowData: any) {
    this.bankRegisterComponent.onRowSelectEdit(rowData);
  }

  delete(rowData: any) {
    this.bankRegisterComponent.delete(rowData);
  }

  search() {
    this.bankSearchComponent.search(null);
  }

  toggleSidebarSearch() {
    this.sidebarSearchVisible = !this.sidebarSearchVisible;
  }

  toggleSidebarRegister() {
    this.sidebarRegisterVisible = !this.sidebarRegisterVisible;
  }
}
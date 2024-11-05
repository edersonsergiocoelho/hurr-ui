import { Component, ViewChild } from '@angular/core';
import { PaymentMethodSearchComponent } from '../payment-method-search/payment-method-search.component';
import { PaymentMethodRegisterComponent } from '../payment-method-register/payment-method-register.component';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent {

  sidebarSearchVisible: boolean = false;
  sidebarRegisterVisible: boolean = false;

  @ViewChild(PaymentMethodSearchComponent) paymentMethodSearchComponent!: PaymentMethodSearchComponent;
  @ViewChild(PaymentMethodRegisterComponent) paymentMethodRegisterComponent!: PaymentMethodRegisterComponent;

  // Método chamado no componente Search
  onRowSelectEdit(rowData: any) {
    this.paymentMethodRegisterComponent.onRowSelectEdit(rowData);
  }

  delete(rowData: any) {
    this.paymentMethodRegisterComponent.delete(rowData);
  }

  search() {
    this.paymentMethodSearchComponent.search(null);
  }

  toggleSidebarSearch() {
    this.sidebarSearchVisible = !this.sidebarSearchVisible;
  }

  toggleSidebarRegister() {
    this.sidebarRegisterVisible = !this.sidebarRegisterVisible;
  }
}
import { Component, ViewChild } from '@angular/core';
import { PaymentStatusDTO } from '../../dto/payment-status-dto.dto';
import { PaymentStatusSearchComponent } from '../payment-status-search/payment-status-search.component';
import { PaymentStatusRegisterComponent } from '../payment-status-register/payment-status-register.component';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent {

  sidebarSearchVisible: boolean = false;
  sidebarRegisterVisible: boolean = false;

  @ViewChild(PaymentStatusSearchComponent) paymentStatusSearchComponent!: PaymentStatusSearchComponent;
  @ViewChild(PaymentStatusRegisterComponent) paymentStatusRegisterComponent!: PaymentStatusRegisterComponent;

  // Método chamado no componente Search
  onRowSelectEdit(rowData: any) {
    this.paymentStatusRegisterComponent.onRowSelectEdit(rowData);
  }

  delete(rowData: any) {
    this.paymentStatusRegisterComponent.delete(rowData);
  }

  search() {
    this.paymentStatusSearchComponent.search(null);
  }

  toggleSidebarSearch() {
    this.sidebarSearchVisible = !this.sidebarSearchVisible;
  }

  toggleSidebarRegister() {
    this.sidebarRegisterVisible = !this.sidebarRegisterVisible;
  }
}
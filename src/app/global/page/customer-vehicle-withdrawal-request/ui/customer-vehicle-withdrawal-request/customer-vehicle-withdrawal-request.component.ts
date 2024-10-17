import { Component, ViewChild } from '@angular/core';
import { CustomerVehicleWithdrawalRequestApprovalComponent } from '../customer-vehicle-withdrawal-request-approval/customer-vehicle-withdrawal-request-approval.component';

@Component({
  selector: 'app-customer-vehicle-withdrawal-request',
  templateUrl: './customer-vehicle-withdrawal-request.component.html',
  styleUrls: ['./customer-vehicle-withdrawal-request.component.css']
})
export class CustomerVehicleWithdrawalRequestComponent {

  sidebarSearchVisible: boolean = false;

  @ViewChild(CustomerVehicleWithdrawalRequestApprovalComponent) customerVehicleWithdrawalRequestApprovalComponent!: CustomerVehicleWithdrawalRequestApprovalComponent;

  search() {
    this.customerVehicleWithdrawalRequestApprovalComponent.search(null);
  }

  toggleSidebarSearch() {
    this.sidebarSearchVisible = !this.sidebarSearchVisible;
  }
}
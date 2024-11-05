import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleWithdrawalRequestApprovalComponent } from './customer-vehicle-withdrawal-request-approval.component';

describe('CustomerVehicleWithdrawalRequestApprovalComponent', () => {
  let component: CustomerVehicleWithdrawalRequestApprovalComponent;
  let fixture: ComponentFixture<CustomerVehicleWithdrawalRequestApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleWithdrawalRequestApprovalComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleWithdrawalRequestApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

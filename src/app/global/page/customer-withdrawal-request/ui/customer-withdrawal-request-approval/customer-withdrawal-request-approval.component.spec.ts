import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWithdrawalRequestApprovalComponent } from './customer-withdrawal-request-approval.component';

describe('CustomerWithdrawalRequestApprovalComponent', () => {
  let component: CustomerWithdrawalRequestApprovalComponent;
  let fixture: ComponentFixture<CustomerWithdrawalRequestApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerWithdrawalRequestApprovalComponent]
    });
    fixture = TestBed.createComponent(CustomerWithdrawalRequestApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

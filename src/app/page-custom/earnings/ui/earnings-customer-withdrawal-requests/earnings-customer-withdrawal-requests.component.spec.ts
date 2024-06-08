import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsCustomerWithdrawalRequestsComponent } from './earnings-customer-withdrawal-requests.component';

describe('EarningsCustomerWithdrawalRequestsComponent', () => {
  let component: EarningsCustomerWithdrawalRequestsComponent;
  let fixture: ComponentFixture<EarningsCustomerWithdrawalRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EarningsCustomerWithdrawalRequestsComponent]
    });
    fixture = TestBed.createComponent(EarningsCustomerWithdrawalRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

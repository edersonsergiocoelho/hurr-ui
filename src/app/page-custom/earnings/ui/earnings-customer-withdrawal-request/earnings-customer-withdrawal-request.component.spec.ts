import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsCustomerWithdrawalRequestComponent } from './earnings-customer-withdrawal-request.component';

describe('EarningsCustomerWithdrawalRequestComponent', () => {
  let component: EarningsCustomerWithdrawalRequestComponent;
  let fixture: ComponentFixture<EarningsCustomerWithdrawalRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EarningsCustomerWithdrawalRequestComponent]
    });
    fixture = TestBed.createComponent(EarningsCustomerWithdrawalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

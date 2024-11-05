import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsCustomerVehicleWithdrawalRequestComponent } from './earnings-customer-vehicle-withdrawal-request.component';

describe('EarningsCustomerVehicleWithdrawalRequestComponent', () => {
  let component: EarningsCustomerVehicleWithdrawalRequestComponent;
  let fixture: ComponentFixture<EarningsCustomerVehicleWithdrawalRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EarningsCustomerVehicleWithdrawalRequestComponent]
    });
    fixture = TestBed.createComponent(EarningsCustomerVehicleWithdrawalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

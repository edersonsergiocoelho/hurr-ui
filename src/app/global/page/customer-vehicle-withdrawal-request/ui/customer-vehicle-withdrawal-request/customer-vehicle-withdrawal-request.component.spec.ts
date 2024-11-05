import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleWithdrawalRequestComponent } from './customer-vehicle-withdrawal-request.component';

describe('CustomerVehicleWithdrawalRequestComponent', () => {
  let component: CustomerVehicleWithdrawalRequestComponent;
  let fixture: ComponentFixture<CustomerVehicleWithdrawalRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleWithdrawalRequestComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleWithdrawalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

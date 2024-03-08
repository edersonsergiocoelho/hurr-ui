import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleBookingCustomerVehicleComponent } from './customer-vehicle-booking-customer-vehicle.component';

describe('CustomerVehicleBookingCustomerVehicleComponent', () => {
  let component: CustomerVehicleBookingCustomerVehicleComponent;
  let fixture: ComponentFixture<CustomerVehicleBookingCustomerVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleBookingCustomerVehicleComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleBookingCustomerVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleBookingCustomerVehicleSearchComponent } from './customer-vehicle-booking-customer-vehicle-search.component';

describe('CustomerVehicleBookingCustomerVehicleSearchComponent', () => {
  let component: CustomerVehicleBookingCustomerVehicleSearchComponent;
  let fixture: ComponentFixture<CustomerVehicleBookingCustomerVehicleSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleBookingCustomerVehicleSearchComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleBookingCustomerVehicleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

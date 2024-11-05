import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleBookingCustomerVehicleCheckInDynamicDialogComponent } from './customer-vehicle-booking-customer-vehicle-check-in-dynamic-dialog.component';

describe('CustomerVehicleBookingCustomerVehicleCheckInDynamicDialogComponent', () => {
  let component: CustomerVehicleBookingCustomerVehicleCheckInDynamicDialogComponent;
  let fixture: ComponentFixture<CustomerVehicleBookingCustomerVehicleCheckInDynamicDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleBookingCustomerVehicleCheckInDynamicDialogComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleBookingCustomerVehicleCheckInDynamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

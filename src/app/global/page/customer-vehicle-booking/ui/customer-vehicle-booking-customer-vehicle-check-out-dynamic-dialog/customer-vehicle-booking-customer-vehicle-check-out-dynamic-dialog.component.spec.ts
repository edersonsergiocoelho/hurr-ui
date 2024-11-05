import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialogComponent } from './customer-vehicle-booking-customer-vehicle-check-out-dynamic-dialog.component';

describe('CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialogComponent', () => {
  let component: CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialogComponent;
  let fixture: ComponentFixture<CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialogComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

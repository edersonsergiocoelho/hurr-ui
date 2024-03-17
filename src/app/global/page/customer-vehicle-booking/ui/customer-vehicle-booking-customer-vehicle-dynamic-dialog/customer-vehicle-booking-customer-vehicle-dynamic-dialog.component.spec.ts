import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleBookingCustomerVehicleDynamicDialogComponent } from './customer-vehicle-booking-customer-vehicle-dynamic-dialog.component';

describe('CustomerVehicleBookingCustomerVehicleDynamicDialogComponent', () => {
  let component: CustomerVehicleBookingCustomerVehicleDynamicDialogComponent;
  let fixture: ComponentFixture<CustomerVehicleBookingCustomerVehicleDynamicDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleBookingCustomerVehicleDynamicDialogComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleBookingCustomerVehicleDynamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

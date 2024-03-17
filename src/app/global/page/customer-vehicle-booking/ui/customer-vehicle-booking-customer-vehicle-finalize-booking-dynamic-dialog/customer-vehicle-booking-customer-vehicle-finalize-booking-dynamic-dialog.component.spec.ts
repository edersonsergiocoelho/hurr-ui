import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogComponent } from './customer-vehicle-booking-customer-vehicle-finalize-booking-dynamic-dialog.component';

describe('CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogComponent', () => {
  let component: CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogComponent;
  let fixture: ComponentFixture<CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleBookingCustomerVehicleFinalizeBookingDynamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleBookingFinalizeBookingDynamicDialogComponent } from './customer-vehicle-booking-finalize-booking-dynamic-dialog.component';

describe('CustomerVehicleBookingFinalizeBookingDynamicDialogComponent', () => {
  let component: CustomerVehicleBookingFinalizeBookingDynamicDialogComponent;
  let fixture: ComponentFixture<CustomerVehicleBookingFinalizeBookingDynamicDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleBookingFinalizeBookingDynamicDialogComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleBookingFinalizeBookingDynamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

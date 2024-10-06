import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleBookingViewReservationComponent } from './customer-vehicle-booking-view-reservation.component';

describe('CustomerVehicleBookingViewReservationComponent', () => {
  let component: CustomerVehicleBookingViewReservationComponent;
  let fixture: ComponentFixture<CustomerVehicleBookingViewReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleBookingViewReservationComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleBookingViewReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { customerVehicleBookingCustomerVehicleViewReservationComponent } from './customer-vehicle-booking-customer-vehicle-view-reservation.component';

describe('CustomerVehicleBookingCustomerVehicleViewReservationComponent', () => {
  let component: customerVehicleBookingCustomerVehicleViewReservationComponent;
  let fixture: ComponentFixture<customerVehicleBookingCustomerVehicleViewReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [customerVehicleBookingCustomerVehicleViewReservationComponent]
    });
    fixture = TestBed.createComponent(customerVehicleBookingCustomerVehicleViewReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

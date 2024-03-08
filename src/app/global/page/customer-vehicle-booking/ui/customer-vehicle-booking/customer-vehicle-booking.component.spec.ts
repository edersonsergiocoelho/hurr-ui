import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleBookingComponent } from './customer-vehicle-booking.component';

describe('CustomerVehicleBookingComponent', () => {
  let component: CustomerVehicleBookingComponent;
  let fixture: ComponentFixture<CustomerVehicleBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleBookingComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

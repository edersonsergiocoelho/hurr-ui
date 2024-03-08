import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleBookingSuccessComponent } from './customer-vehicle-booking-success.component';

describe('CustomerVehicleBookingSuccessComponent', () => {
  let component: CustomerVehicleBookingSuccessComponent;
  let fixture: ComponentFixture<CustomerVehicleBookingSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleBookingSuccessComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleBookingSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

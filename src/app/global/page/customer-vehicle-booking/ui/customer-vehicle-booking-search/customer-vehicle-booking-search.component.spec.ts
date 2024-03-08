import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVehicleBookingSearchComponent } from './customer-vehicle-booking-search.component';

describe('CustomerVehicleBookingSearchComponent', () => {
  let component: CustomerVehicleBookingSearchComponent;
  let fixture: ComponentFixture<CustomerVehicleBookingSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerVehicleBookingSearchComponent]
    });
    fixture = TestBed.createComponent(CustomerVehicleBookingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

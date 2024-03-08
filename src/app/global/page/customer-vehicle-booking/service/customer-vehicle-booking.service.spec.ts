import { TestBed } from '@angular/core/testing';

import { CustomerVehicleBookingService } from './customer-vehicle-booking.service';

describe('CustomerVehicleBookingService', () => {
  let service: CustomerVehicleBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVehicleBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

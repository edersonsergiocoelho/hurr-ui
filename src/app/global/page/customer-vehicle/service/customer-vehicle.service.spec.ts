import { TestBed } from '@angular/core/testing';

import { CustomerVehicleService } from './customer-vehicle.service';

describe('CustomerVehicleService', () => {
  let service: CustomerVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

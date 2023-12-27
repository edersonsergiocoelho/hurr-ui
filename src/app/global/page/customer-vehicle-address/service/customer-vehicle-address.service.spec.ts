import { TestBed } from '@angular/core/testing';

import { CustomerVehicleAddressService } from './customer-vehicle-address.service';

describe('CustomerVehicleAddressService', () => {
  let service: CustomerVehicleAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVehicleAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CustomerVehicleApprovedService } from './customer-vehicle-approved.service';

describe('CustomerVehicleApprovedService', () => {
  let service: CustomerVehicleApprovedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVehicleApprovedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

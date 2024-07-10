import { TestBed } from '@angular/core/testing';

import { CustomerVehicleFileInsuranceService } from './customer-vehicle-file-insurance.service';

describe('CustomerVehicleFileInsuranceService', () => {
  let service: CustomerVehicleFileInsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVehicleFileInsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

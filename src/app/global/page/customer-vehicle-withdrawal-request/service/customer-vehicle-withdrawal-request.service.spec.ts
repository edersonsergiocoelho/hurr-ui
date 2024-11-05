import { TestBed } from '@angular/core/testing';

import { CustomerVehicleWithdrawalRequestService } from './customer-vehicle-withdrawal-request.service';

describe('CustomerVehicleWithdrawalRequestService', () => {
  let service: CustomerVehicleWithdrawalRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVehicleWithdrawalRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

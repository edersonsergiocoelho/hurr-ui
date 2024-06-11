import { TestBed } from '@angular/core/testing';

import { CustomerWithdrawalRequestService } from './customer-withdrawal-request.service';

describe('CustomerWithdrawalRequestService', () => {
  let service: CustomerWithdrawalRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerWithdrawalRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

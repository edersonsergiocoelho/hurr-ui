import { TestBed } from '@angular/core/testing';

import { CustomerWithdrawalRequestsService } from './customer-withdrawal-requests.service';

describe('CustomerWithdrawalRequestsService', () => {
  let service: CustomerWithdrawalRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerWithdrawalRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

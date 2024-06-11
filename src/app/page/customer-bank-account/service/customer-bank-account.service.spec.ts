import { TestBed } from '@angular/core/testing';

import { CustomerBankAccountService } from './customer-bank-account.service';

describe('CustomerBankAccountService', () => {
  let service: CustomerBankAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerBankAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

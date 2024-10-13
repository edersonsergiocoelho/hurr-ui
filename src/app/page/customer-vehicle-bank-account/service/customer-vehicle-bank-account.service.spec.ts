import { TestBed } from '@angular/core/testing';
import { CustomerVehicleBankAccountService } from './customer-vehicle-bank-account.service';

describe('CustomerVehicleBankAccountService', () => {
  let service: CustomerVehicleBankAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVehicleBankAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MpPaymentCreateService } from './mp-payment-create.service';

describe('MpPaymentCreateService', () => {
  let service: MpPaymentCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpPaymentCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

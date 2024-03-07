import { TestBed } from '@angular/core/testing';

import { MpPaymentService } from './mp-payment.service';

describe('MpPaymentService', () => {
  let service: MpPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

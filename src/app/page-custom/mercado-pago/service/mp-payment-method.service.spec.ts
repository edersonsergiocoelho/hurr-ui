import { TestBed } from '@angular/core/testing';

import { MpPaymentMethodService } from './mp-payment-method.service';

describe('MpPaymentMethodService', () => {
  let service: MpPaymentMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpPaymentMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

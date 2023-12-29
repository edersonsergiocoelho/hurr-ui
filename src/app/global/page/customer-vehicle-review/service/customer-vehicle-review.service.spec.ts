import { TestBed } from '@angular/core/testing';

import { CustomerVehicleReviewService } from './customer-vehicle-review.service';

describe('CustomerVehicleReviewService', () => {
  let service: CustomerVehicleReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVehicleReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

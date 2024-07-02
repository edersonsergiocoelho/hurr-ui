import { TestBed } from '@angular/core/testing';

import { VehicleTransmissionService } from './vehicle-transmission.service';

describe('VehicleTransmissionService', () => {
  let service: VehicleTransmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleTransmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

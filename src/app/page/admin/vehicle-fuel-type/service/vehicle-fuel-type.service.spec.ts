import { TestBed } from '@angular/core/testing';

import { VehicleFuelTypeService } from './vehicle-fuel-type.service';

describe('VehicleFuelTypeService', () => {
  let service: VehicleFuelTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleFuelTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

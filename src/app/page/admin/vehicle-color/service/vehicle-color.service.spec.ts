import { TestBed } from '@angular/core/testing';

import { VehicleColorService } from './vehicle-color.service';

describe('VehicleColorService', () => {
  let service: VehicleColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

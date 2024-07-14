import { TestBed } from '@angular/core/testing';

import { CustomerVehicleFilePhotoService } from './customer-vehicle-file-photo.service';

describe('CustomerVehicleFilePhotoService', () => {
  let service: CustomerVehicleFilePhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVehicleFilePhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

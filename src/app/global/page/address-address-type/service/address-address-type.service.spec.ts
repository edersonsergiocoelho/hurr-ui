import { TestBed } from '@angular/core/testing';

import { AddressAddressTypeService } from './address-address-type.service';

describe('AddressAddressTypeService', () => {
  let service: AddressAddressTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressAddressTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InterPIXService } from './inter-pix.service';

describe('InterPIXService', () => {
  let service: InterPIXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterPIXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

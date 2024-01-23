import { TestBed } from '@angular/core/testing';

import { FileApprovedService } from './file-approved.service';

describe('FileApprovedService', () => {
  let service: FileApprovedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileApprovedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

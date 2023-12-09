import { TestBed } from '@angular/core/testing';

import { UiHomeService } from './ui-home.service';

describe('UiHomeService', () => {
  let service: UiHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

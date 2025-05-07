import { TestBed } from '@angular/core/testing';

import { FallService } from './fall.service';

describe('FallService', () => {
  let service: FallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SimTopdeckService } from './sim-topdeck.service';

describe('SimTopdeckService', () => {
  let service: SimTopdeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimTopdeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

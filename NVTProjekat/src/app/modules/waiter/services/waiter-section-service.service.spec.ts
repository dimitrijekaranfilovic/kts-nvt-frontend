import { TestBed } from '@angular/core/testing';

import { WaiterSectionServiceService } from './waiter-section-service.service';

describe('WaiterSectionServiceService', () => {
  let service: WaiterSectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaiterSectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

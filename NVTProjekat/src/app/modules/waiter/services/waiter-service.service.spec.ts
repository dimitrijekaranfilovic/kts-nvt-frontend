import { TestBed } from '@angular/core/testing';

import { WaiterServiceService } from './waiter-service.service';

describe('WaiterServiceService', () => {
  let service: WaiterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaiterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

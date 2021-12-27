import { TestBed } from '@angular/core/testing';

import { MenuItemTableService } from './menu-item-table.service';

describe('MenuItemTableService', () => {
  let service: MenuItemTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuItemTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

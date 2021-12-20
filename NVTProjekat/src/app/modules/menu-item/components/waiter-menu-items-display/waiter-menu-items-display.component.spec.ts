import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterMenuItemsDisplayComponent } from './waiter-menu-items-display.component';

describe('WaiterMenuItemsDisplayComponent', () => {
  let component: WaiterMenuItemsDisplayComponent;
  let fixture: ComponentFixture<WaiterMenuItemsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiterMenuItemsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterMenuItemsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

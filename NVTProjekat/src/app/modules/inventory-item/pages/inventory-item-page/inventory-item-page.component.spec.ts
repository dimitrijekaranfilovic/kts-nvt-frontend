import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemPageComponent } from './inventory-item-page.component';

describe('InventoryItemPageComponent', () => {
  let component: InventoryItemPageComponent;
  let fixture: ComponentFixture<InventoryItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

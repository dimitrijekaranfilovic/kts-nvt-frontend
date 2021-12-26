import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateInventoryItemComponent } from './create-update-inventory-item.component';

describe('CreateUpdateInventoryItemComponent', () => {
  let component: CreateUpdateInventoryItemComponent;
  let fixture: ComponentFixture<CreateUpdateInventoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateInventoryItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateInventoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

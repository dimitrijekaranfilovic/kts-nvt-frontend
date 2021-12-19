import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGroupItemComponent } from './order-group-item.component';

describe('OrderGroupItemComponent', () => {
  let component: OrderGroupItemComponent;
  let fixture: ComponentFixture<OrderGroupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderGroupItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

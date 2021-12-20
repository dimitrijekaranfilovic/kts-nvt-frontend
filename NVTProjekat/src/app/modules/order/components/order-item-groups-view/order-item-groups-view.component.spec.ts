import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemGroupsViewComponent } from './order-item-groups-view.component';

describe('OrderItemGroupsViewComponent', () => {
  let component: OrderItemGroupsViewComponent;
  let fixture: ComponentFixture<OrderItemGroupsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemGroupsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemGroupsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

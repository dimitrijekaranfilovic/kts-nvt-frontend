import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMenuItemPriceComponent } from './update-menu-item-price.component';

describe('UpdateMenuItemPriceComponent', () => {
  let component: UpdateMenuItemPriceComponent;
  let fixture: ComponentFixture<UpdateMenuItemPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateMenuItemPriceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMenuItemPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

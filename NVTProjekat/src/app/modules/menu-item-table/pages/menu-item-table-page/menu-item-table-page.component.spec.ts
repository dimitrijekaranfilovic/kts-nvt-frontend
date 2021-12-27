import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemTablePageComponent } from './menu-item-table-page.component';

describe('MenuItemTablePageComponent', () => {
  let component: MenuItemTablePageComponent;
  let fixture: ComponentFixture<MenuItemTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemTablePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

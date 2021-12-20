import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuItemToExistingGroupDialogComponent } from './add-menu-item-to-existing-group-dialog.component';

describe('AddMenuItemToExistingGroupDialogComponent', () => {
  let component: AddMenuItemToExistingGroupDialogComponent;
  let fixture: ComponentFixture<AddMenuItemToExistingGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuItemToExistingGroupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuItemToExistingGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

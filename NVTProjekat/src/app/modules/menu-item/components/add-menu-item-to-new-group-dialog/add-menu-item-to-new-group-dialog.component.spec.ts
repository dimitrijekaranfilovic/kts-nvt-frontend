import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuItemToNewGroupDialogComponent } from './add-menu-item-to-new-group-dialog.component';

describe('AddMenuItemToNewGroupDialogComponent', () => {
  let component: AddMenuItemToNewGroupDialogComponent;
  let fixture: ComponentFixture<AddMenuItemToNewGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuItemToNewGroupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuItemToNewGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

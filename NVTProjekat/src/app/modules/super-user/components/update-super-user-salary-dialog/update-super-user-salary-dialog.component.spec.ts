import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSuperUserSalaryDialogComponent } from './update-super-user-salary-dialog.component';

describe('UpdateSuperUserSalaryDialogComponent', () => {
  let component: UpdateSuperUserSalaryDialogComponent;
  let fixture: ComponentFixture<UpdateSuperUserSalaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSuperUserSalaryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSuperUserSalaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

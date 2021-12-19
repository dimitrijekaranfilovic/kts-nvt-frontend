import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeSalaryDialogComponent } from './update-employee-salary-dialog.component';

describe('UpdateEmployeeSalaryDialogComponent', () => {
  let component: UpdateEmployeeSalaryDialogComponent;
  let fixture: ComponentFixture<UpdateEmployeeSalaryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployeeSalaryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmployeeSalaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

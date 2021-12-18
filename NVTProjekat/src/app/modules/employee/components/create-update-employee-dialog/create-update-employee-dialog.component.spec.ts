import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateEmployeeDialogComponent } from './create-update-employee-dialog.component';

describe('CreateUpdateEmployeeDialogComponent', () => {
  let component: CreateUpdateEmployeeDialogComponent;
  let fixture: ComponentFixture<CreateUpdateEmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateEmployeeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

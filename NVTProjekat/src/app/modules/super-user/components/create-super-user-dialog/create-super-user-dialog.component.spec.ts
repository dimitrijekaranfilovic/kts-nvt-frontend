import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuperUserDialogComponent } from './create-super-user-dialog.component';

describe('CreateSuperUserDialogComponent', () => {
  let component: CreateSuperUserDialogComponent;
  let fixture: ComponentFixture<CreateSuperUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSuperUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSuperUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSectionDialogComponent } from './create-update-section-dialog.component';

describe('CreateUpdateSectionDialogComponent', () => {
  let component: CreateUpdateSectionDialogComponent;
  let fixture: ComponentFixture<CreateUpdateSectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateSectionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

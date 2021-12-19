import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperUsersTableComponent } from './super-users-table.component';

describe('SuperUsersTableComponent', () => {
  let component: SuperUsersTableComponent;
  let fixture: ComponentFixture<SuperUsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperUsersTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

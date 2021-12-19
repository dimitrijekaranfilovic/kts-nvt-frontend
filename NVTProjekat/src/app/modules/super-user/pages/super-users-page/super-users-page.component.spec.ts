import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperUsersPageComponent } from './super-users-page.component';

describe('SuperUsersPageComponent', () => {
  let component: SuperUsersPageComponent;
  let fixture: ComponentFixture<SuperUsersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperUsersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

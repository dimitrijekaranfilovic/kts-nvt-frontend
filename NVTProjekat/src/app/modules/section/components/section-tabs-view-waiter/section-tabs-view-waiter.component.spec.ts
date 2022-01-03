import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTabsViewWaiterComponent } from './section-tabs-view-waiter.component';

describe('SectionTabsViewWaiterComponent', () => {
  let component: SectionTabsViewWaiterComponent;
  let fixture: ComponentFixture<SectionTabsViewWaiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTabsViewWaiterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTabsViewWaiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

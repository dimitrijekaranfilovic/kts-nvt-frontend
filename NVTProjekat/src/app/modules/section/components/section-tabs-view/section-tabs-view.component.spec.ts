import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTabsViewComponent } from './section-tabs-view.component';

describe('SectionTabsViewComponent', () => {
  let component: SectionTabsViewComponent;
  let fixture: ComponentFixture<SectionTabsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTabsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTabsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

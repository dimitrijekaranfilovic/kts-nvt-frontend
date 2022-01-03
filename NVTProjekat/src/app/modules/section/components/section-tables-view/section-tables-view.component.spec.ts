import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTablesViewComponent } from './section-tables-view.component';

describe('SectionTablesViewComponent', () => {
  let component: SectionTablesViewComponent;
  let fixture: ComponentFixture<SectionTablesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTablesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTablesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

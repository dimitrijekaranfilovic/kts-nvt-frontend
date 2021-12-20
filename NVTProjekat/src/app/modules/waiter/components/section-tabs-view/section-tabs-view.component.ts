import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Section } from '../../types/Section';
import { WaiterSectionServiceService } from '../../services/waiter-section-service.service';
import { Table } from '../../types/Table';

@Component({
  selector: 'app-section-tabs-view',
  templateUrl: './section-tabs-view.component.html',
  styleUrls: ['./section-tabs-view.component.scss']
})
export class SectionTabsViewComponent implements OnInit {

  tables!: Table[];
  sections!: Section[];
  selected = new FormControl(0);

  constructor(private sectionService: WaiterSectionServiceService) { }

  ngOnInit(): void {
    this.sectionService.getSections().subscribe(response => {
      this.sections = response;
      this.sections.sort((s1, s2) => s1.id - s2.id);
    })
  }

  onTabSelect(event: any): void {
    this.sectionService.getTablesForSection(event.index + 1).subscribe(response => this.tables = response);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Section } from '../../types/Section';
import { WaiterSectionServiceService } from '../../services/waiter-section-service.service';
import { Table } from '../../types/Table';

@Component({
  selector: 'app-section-tabs-view-waiter',
  templateUrl: './section-tabs-view-waiter.component.html',
  styleUrls: ['./section-tabs-view-waiter.component.scss']
})
export class SectionTabsViewWaiterComponent implements OnInit {

  tables: Map<number, Table[]> = new Map<number, Table[]>();
  sections!: Section[];
  selected = new FormControl(0);
  counter: number = 1;

  constructor(private sectionService: WaiterSectionServiceService) { }

  ngOnInit(): void {
    this.sectionService.getSections().subscribe(response => {
      this.sections = response;
      this.sections.sort((s1, s2) => s1.id - s2.id);
    })
  }

  onTabSelect(event: any): void {
    if(event){
      this.fetchTables(event.index + 1);
    }
    else{
      this.fetchTables(1);
    }
    }

  fetchTables(index: number) {
    this.sectionService.getTablesForSection(index).subscribe(response => this.tables.set(index, response));
  }

}

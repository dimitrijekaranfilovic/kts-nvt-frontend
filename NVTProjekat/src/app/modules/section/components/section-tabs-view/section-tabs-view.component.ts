import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SectionService } from '../../services/section-service/section.service';
import { ReadSectionResponse } from '../../types/ReadSectionResponse';

@Component({
  selector: 'app-section-tabs-view',
  templateUrl: './section-tabs-view.component.html',
  styleUrls: ['./section-tabs-view.component.scss']
})
export class SectionTabsViewComponent implements OnInit {
  tabs: ReadSectionResponse[] = [];
  selected = new FormControl(0);

  constructor(
    private sectionService: SectionService
  ) { }

  ngOnInit(): void {
    this.sectionService.read().subscribe(response => {
      this.tabs = response;
    })
  }

  addTab(): void {
    this.selected.setValue(this.tabs.length - 1);
  }

  removeTab(index: number): void {
    this.tabs.splice(index, 1);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from '../../services/section-service/section.service';
import { ReadSectionResponse } from '../../types/ReadSectionResponse';
import { Table } from '../../types/Table';

@Component({
  selector: 'app-section-page',
  templateUrl: './section-page.component.html',
  styleUrls: ['./section-page.component.scss'],
})
export class SectionPageComponent implements OnInit {
  private sectionId!: number;
  section!: ReadSectionResponse;
  tables: Table[] = [];

  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService
  ) {}

  ngOnInit(): void {
    this.sectionId = Number(this.route.snapshot.paramMap.get('id'));
    this.section = {
      id: this.sectionId,
      name: 'imelo',
    };
    this.sectionService
      .getTablesForSection(this.sectionId)
      .subscribe((tables) => {
        this.tables = tables;
      });
  }
}

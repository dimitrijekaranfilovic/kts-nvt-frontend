import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WaiterSectionServiceService } from 'src/app/modules/waiter/services/waiter-section-service.service';
import { Table } from 'src/app/modules/waiter/types/Table';
import { ReadSectionResponse } from '../../types/ReadSectionResponse';

@Component({
  selector: 'app-section-page',
  templateUrl: './section-page.component.html',
  styleUrls: ['./section-page.component.scss']
})
export class SectionPageComponent implements OnInit {

  private sectionId!: number;
  section!: ReadSectionResponse;
  tables: Table[] = [];

  constructor(
    private route: ActivatedRoute,
    private sectionService: WaiterSectionServiceService
  ) { }

  ngOnInit(): void {
    this.sectionId = Number(this.route.snapshot.paramMap.get('id'));
    this.section = {
      id: this.sectionId,
      name: 'imelo'
    };
    this.sectionService.getTablesForSection(this.sectionId).subscribe(tables => {
      this.tables = tables;
      console.log(tables);
    })
  }

}

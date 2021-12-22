import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from 'src/app/modules/waiter/types/Table';
import { ReadSectionResponse } from '../../types/ReadSectionResponse';

@Component({
  selector: 'app-section-tab',
  templateUrl: './section-tab.component.html',
  styleUrls: ['./section-tab.component.scss']
})
export class SectionTabComponent implements OnInit {
  @Input() section!: ReadSectionResponse;
  @Input() tables!: Table[] | undefined;

  @Output()
  onUpdateSection: EventEmitter<ReadSectionResponse> = new EventEmitter<ReadSectionResponse>();
  @Output()
  onDeleteSection: EventEmitter<ReadSectionResponse> = new EventEmitter<ReadSectionResponse>();
  @Output() onAddTable: EventEmitter<ReadSectionResponse> = new EventEmitter<ReadSectionResponse>();

  constructor() { }

  ngOnInit(): void {
  }

  updateSection(): void {
    this.onUpdateSection.emit(this.section);
  }

  deleteSection(): void {
    this.onDeleteSection.emit(this.section);
  }

  addTable(): void {
    this.onAddTable.emit(this.section);
  }

}

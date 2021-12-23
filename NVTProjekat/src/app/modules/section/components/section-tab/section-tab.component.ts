import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Table } from 'src/app/modules/waiter/types/Table';
import { TableOrder } from 'src/app/modules/waiter/types/TableOrder';
import { DeleteTableRequest } from '../../types/DeleteTableRequest';
import { ReadSectionResponse } from '../../types/ReadSectionResponse';

@Component({
  selector: 'app-section-tab',
  templateUrl: './section-tab.component.html',
  styleUrls: ['./section-tab.component.scss']
})
export class SectionTabComponent {
  @Input() section!: ReadSectionResponse;
  @Input() tables!: Table[] | undefined;

  @Output()
  onUpdateSection: EventEmitter<ReadSectionResponse> = new EventEmitter<ReadSectionResponse>();
  @Output()
  onDeleteSection: EventEmitter<ReadSectionResponse> = new EventEmitter<ReadSectionResponse>();
  @Output() onAddTable: EventEmitter<ReadSectionResponse> = new EventEmitter<ReadSectionResponse>();
  @Output() onDeleteTable: EventEmitter<DeleteTableRequest> = new EventEmitter<DeleteTableRequest>();

  selectedTableId: number = 0;
  selectedTableNumber: number = 0;

  constructor() { }

  updateSection(): void {
    this.onUpdateSection.emit(this.section);
  }

  deleteSection(): void {
    this.onDeleteSection.emit(this.section);
  }

  addTable(): void {
    this.onAddTable.emit(this.section);
  }

  deleteTable(): void {
    this.onDeleteTable.emit({id: this.selectedTableId, number: this.selectedTableNumber});
  }

  selectTable(tableInfo: TableOrder) {
    this.selectedTableId = tableInfo.tableId;
    this.selectedTableNumber = tableInfo.tableNumber;
  }
}

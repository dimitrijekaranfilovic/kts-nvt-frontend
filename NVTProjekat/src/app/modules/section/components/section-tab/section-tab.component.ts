import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input()
  section!: ReadSectionResponse;
  @Input()
  tables: Table[] = [];

  @Output()
  updateSection: EventEmitter<ReadSectionResponse> = new EventEmitter<ReadSectionResponse>();
  @Output()
  deleteSection: EventEmitter<ReadSectionResponse> = new EventEmitter<ReadSectionResponse>();
  @Output()
  addTable: EventEmitter<ReadSectionResponse> = new EventEmitter<ReadSectionResponse>();
  @Output()
  deleteTable: EventEmitter<DeleteTableRequest> = new EventEmitter<DeleteTableRequest>();

  selectedTableId: number = 0;
  selectedTableNumber: number = 0;

  onUpdateSection(): void {
    this.updateSection.emit(this.section);
  }

  onDeleteSection(): void {
    this.deleteSection.emit(this.section);
  }

  onAddTable(): void {
    this.addTable.emit(this.section);
  }

  onDeleteTable(): void {
    this.deleteTable.emit({ id: this.selectedTableId, number: this.selectedTableNumber });
  }

  selectTable(tableInfo: TableOrder) {
    this.selectedTableId = tableInfo.tableId;
    this.selectedTableNumber = tableInfo.tableNumber;
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'src/app/modules/shared/services/confirmation-service/confirmation.service';
import { Table } from 'src/app/modules/waiter/types/Table';
import { TableOrder } from 'src/app/modules/waiter/types/TableOrder';
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
  @Output() onDeleteTable: EventEmitter<number> = new EventEmitter<number>();

  selectedTableId: number = 0;
  selectedTableNumber: number = 0;

  constructor(private confirmationService: ConfirmationService) { }

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
    this.confirmationService.confirm({
      title: `Table deletion`,
      message: `Are you sure you want to delete table with number: ${this.selectedTableNumber}?`,
      yes: 'Yes',
      no: 'No'
    }).subscribe(confirmation => {
      if (confirmation) {
        this.onDeleteTable.emit(this.selectedTableId);
      }
    })
  }

  selectTable(tableInfo: TableOrder) {
    this.selectedTableId = tableInfo.tableId;
    this.selectedTableNumber = tableInfo.tableNumber;
  }
}

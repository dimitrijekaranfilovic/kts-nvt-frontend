import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observer } from 'rxjs';
import { ConfirmationService } from 'src/app/modules/shared/services/confirmation-service/confirmation.service';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { SectionTablesViewComponent } from 'src/app/modules/waiter/components/section-tables-view/section-tables-view.component';
import { Table } from 'src/app/modules/waiter/types/Table';
import { TableOrder } from 'src/app/modules/waiter/types/TableOrder';
import { TableService } from '../../services/table-service/table.service';
import { ReadSectionResponse } from '../../types/ReadSectionResponse';
import { CreateTableDialogComponent } from '../create-table-dialog/create-table-dialog.component';

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
  @ViewChild(SectionTablesViewComponent)
  layout!: SectionTablesViewComponent;

  selectedTableId: number = 0;
  selectedTableNumber: number = 0;

  constructor(
    private dialogService: MatDialog,
    private tableService: TableService,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService) {

  }

  onAddTable(): void {
    this.dialogService.open(CreateTableDialogComponent, {
      data: {
        number: 1,
        x: 0,
        y: 0,
        r: 50
      }
    }).componentInstance.saveChanges.subscribe(request => {
      request.r = 50;
      this.tableService.createTable(request, this.section.id).subscribe(this.handleTableUpdate());
    });
  }

  onDeleteTable(): void {
    this.confirmationService.confirm({
      title: `Table deletion`,
      message: `Are you sure you want to delete table with number: ${this.selectedTableNumber}?`,
    }).subscribe(confirmation => {
      if (confirmation) {
        this.tableService.deleteTable(this.selectedTableId).subscribe(this.handleTableUpdate());
      }
    })
  }

  handleTableUpdate<T>(): Partial<Observer<T>> {
    return {
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        this.errorService.handle(err);
      }
    };
  }

  selectTable(tableInfo: TableOrder) {
    this.selectedTableId = tableInfo.tableId;
    this.selectedTableNumber = tableInfo.tableNumber;
  }
}

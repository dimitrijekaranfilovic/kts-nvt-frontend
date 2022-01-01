import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationService } from 'src/app/modules/shared/services/confirmation-service/confirmation.service';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { WaiterSectionServiceService } from 'src/app/modules/waiter/services/waiter-section-service.service';
import { Table } from 'src/app/modules/waiter/types/Table';
import { SectionService } from '../../services/section-service/section.service';
import { TableService } from '../../services/table-service/table.service';
import { DeleteTableRequest } from '../../types/DeleteTableRequest';
import { ReadSectionResponse } from '../../types/ReadSectionResponse';
import { CreateTableDialogComponent } from '../create-table-dialog/create-table-dialog.component';
import { CreateUpdateSectionDialogComponent } from '../create-update-section-dialog/create-update-section-dialog.component';

@Component({
  selector: 'app-section-tabs-view',
  templateUrl: './section-tabs-view.component.html',
  styleUrls: ['./section-tabs-view.component.scss']
})
export class SectionTabsViewComponent implements OnInit {
  tables: Map<number, Table[]> = new Map<number, Table[]>();
  displayedColumns: string[] = [
    'id',
    'name',
    'actions',
  ];
  dataSource: MatTableDataSource<ReadSectionResponse> = new MatTableDataSource<ReadSectionResponse>();

  constructor(
    private sectionService: SectionService,
    private dialogService: MatDialog,
    private errorService: ErrorService,
    private confirmationService: ConfirmationService,
    private tableService: TableService,
    private waiterSectionService: WaiterSectionServiceService
  ) { }

  ngOnInit(): void {
    this.sectionService.read().subscribe(response => {
      response.sort((s1, s2) => s1.id - s2.id);
      this.dataSource.data = response;
    })
  }

  fetchData() {
    const sectionId = 1;
    this.waiterSectionService.getTablesForSection(sectionId).subscribe(response => {
      console.log(response);
      this.tables.set(sectionId, response);
    });
  }

  onCreateSection(): void {
    this.dialogService.open(CreateUpdateSectionDialogComponent, {
      data: {
        id: 0, name: ''
      }
    }).componentInstance.saveChanges.subscribe(request => {
      this.sectionService.create(request).subscribe({
        next: response => {
          this.dataSource.data.push({
            ...request, ...response
          });
        },
        error: err => this.errorService.handle(err)
      })
    });
  }

  onAddTable(section: ReadSectionResponse): void {
    this.dialogService.open(CreateTableDialogComponent, {
      data: {
        number: 1,
        x: 0,
        y: 0,
        r: 50
      }
    }).componentInstance.saveChanges.subscribe(request => {
      request.r = 50;
      this.tableService.createTable(request, section.id).subscribe({
        next: () => {
          this.fetchData();
          window.location.reload();
        },
        error: (error) => this.errorService.handle(error)
      })
    });
  }

  onUpdateSection(section: ReadSectionResponse): void {
    this.dialogService.open(CreateUpdateSectionDialogComponent, {
      data: section
    }).componentInstance.saveChanges.subscribe(request => {
      this.sectionService.update(section.id, request).subscribe({
        next: _ => section.name = request.name,
        error: err => this.errorService.handle(err)
      })
    });
  }

  onDeleteSection(section: ReadSectionResponse): void {
    this.confirmationService.confirm({
      title: 'Delete section',
      message: `Are you sure you want to delete section '${section.name}'?`
    }).subscribe(confirmation => {
      if (confirmation) {
        this.sectionService.delete(section.id).subscribe({
          next: _ => this.dataSource.data = this.dataSource.data.filter(s => s.id !== section.id),
          error: err => this.errorService.handle(err)
        })
      }
    })
  }

  onDeleteTable(table: DeleteTableRequest): void {
    this.confirmationService.confirm({
      title: `Table deletion`,
      message: `Are you sure you want to delete table with number: ${table.number}?`,
      yes: 'Yes',
      no: 'No'
    }).subscribe(confirmation => {
      if (confirmation) {
        this.tableService.deleteTable(table.id).subscribe({
          next: () => {
            this.fetchData();
            window.location.reload();
          },
          error: (err) => {
            this.errorService.handle(err);
          }
        });
      }
    })
  }

}

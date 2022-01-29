import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observer } from 'rxjs';
import { ConfirmationService } from 'src/app/modules/shared/services/confirmation-service/confirmation.service';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { EmployeeService } from '../../services/employee-service/employee.service';
import { ReadEmployeeResponse } from '../../types/ReadEmployeeResponse';
import { ReadEmployeesRequest } from '../../types/ReadEmployeesRequest';
import { CreateUpdateEmployeeDialogComponent } from '../create-update-employee-dialog/create-update-employee-dialog.component';
import { UpdateEmployeeSalaryDialogComponent } from '../update-employee-salary-dialog/update-employee-salary-dialog.component';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'surname',
    'pin',
    'type',
    'currentSalary',
    'actions',
  ];
  dataSource: MatTableDataSource<ReadEmployeeResponse> =
    new MatTableDataSource<ReadEmployeeResponse>();
  searchParams: ReadEmployeesRequest = {};
  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 10;
  totalElements: number = 0;
  waitingResults: boolean = true;

  constructor(
    private employeeService: EmployeeService,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService,
    private dialogService: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData(0, this.defaultPageSize);
  }

  fetchData(pageIdx: number, pageSize: number): void {
    this.waitingResults = true;
    this.employeeService
      .read(pageIdx, pageSize, this.searchParams)
      .subscribe((page) => {
        this.pageNum = page.pageable.pageNumber;
        this.pageSize = page.pageable.pageSize;
        this.totalPages = page.totalPages;
        this.dataSource.data = page.content;
        this.totalElements = page.totalElements;
        this.waitingResults = false;
      });
  }

  onSelectPage(event: any): void {
    this.fetchData(event.pageIndex, event.pageSize);
  }

  onSearchEmployee(params: ReadEmployeesRequest): void {
    this.searchParams = params;
    this.fetchData(0, this.pageSize);
  }

  onCreateEmployee(): void {
    this.dialogService
      .open(CreateUpdateEmployeeDialogComponent, {
        data: {
          id: 0,
          name: '',
          surname: '',
          pin: '0000',
          type: 'WAITER',
          currentSalary: 0,
        },
      })
      .componentInstance.onSaveChanges.subscribe((created) => {
        this.employeeService
          .create(created)
          .subscribe(this.getDefaultEntityServiceHandler());
      });
  }

  onDeleteEmployee(employee: ReadEmployeeResponse): void {
    this.confirmationService
      .confirm({
        title: `Employee deletion`,
        message: `Are you sure you want to delete employee ${employee.name} ${employee.surname} with PIN ${employee.pin}?`,
        yes: 'Yes',
        no: 'No',
      })
      .subscribe((confirmation) => {
        if (confirmation) {
          const nextPage =
            this.pageSize == 1 && this.pageNum > 0
              ? this.pageNum - 1
              : this.pageNum;
          this.employeeService
            .delete(employee.id)
            .subscribe(this.getDefaultEntityServiceHandler(nextPage));
        }
      });
  }

  onUpdateEmployee(employee: ReadEmployeeResponse): void {
    this.waitingResults = true;
    this.dialogService
      .open(CreateUpdateEmployeeDialogComponent, { data: employee })
      .componentInstance.onSaveChanges.subscribe((updated) => {
        this.employeeService
          .update(employee.id, updated)
          .subscribe(this.getDefaultEntityServiceHandler());
      });
  }

  onUpdateSalary(employee: ReadEmployeeResponse): void {
    this.waitingResults = true;
    this.dialogService
      .open(UpdateEmployeeSalaryDialogComponent, { data: employee })
      .componentInstance.onSalaryUpdate.subscribe((salary) => {
        this.employeeService
          .updateSalary(employee.id, { amount: salary })
          .subscribe(this.getDefaultEntityServiceHandler());
      });
  }

  getDefaultEntityServiceHandler<TResponse = void>(
    page?: number
  ): Partial<Observer<TResponse>> {
    return {
      next: (_) => {
        this.fetchData(page ?? this.pageNum, this.pageSize);
      },
      error: (err) => {
        this.errorService.handle(err);
        this.waitingResults = false;
      },
    };
  }
}

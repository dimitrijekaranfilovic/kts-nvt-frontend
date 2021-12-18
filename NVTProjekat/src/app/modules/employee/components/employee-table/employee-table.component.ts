import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationService } from 'src/app/modules/shared/services/confirmation-service/confirmation.service';
import { EmployeeService } from '../../services/employee-service/employee.service';
import { ReadEmployeeResponse } from '../../types/ReadEmployeeResponse';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'pin', 'type', 'currentSalary', 'actions'];
  dataSource: MatTableDataSource<ReadEmployeeResponse> = new MatTableDataSource<ReadEmployeeResponse>();
  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 5;

  constructor(
    private employeeService: EmployeeService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.fetchData(0, this.defaultPageSize);
  }

  fetchData(pageIdx: number, pageSize: number): void {
    this.employeeService.read(pageIdx, pageSize).subscribe(page => {
      this.pageNum = page.pageable.pageNumber;
      this.pageSize = page.pageable.pageSize;
      this.totalPages = page.totalPages;
      this.dataSource = new MatTableDataSource<ReadEmployeeResponse>(page.content);
    });
  }

  onSelectPage(event: any): void {
    this.fetchData(event.pageIndex, event.pageSize);
  }

  onDeleteEmployee(employee: ReadEmployeeResponse): void {
    this.confirmationService.confirm({
      title: `Employee deletion`,
      message: `Are you sure you want to delete employee ${employee.name} ${employee.surname} with PIN ${employee.pin}?`,
      yes: 'Yes',
      no: 'No'
    }).subscribe(confirmation => {
      if (confirmation) {
        console.log("CONFIRMED SUCCESSFULLY");
      }
    })
  }
}

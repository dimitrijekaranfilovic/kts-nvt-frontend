import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatedResponse } from 'src/app/modules/shared/types/PaginatedResponse';
import { EmployeeService } from '../../services/employee-service/employee.service';
import { ReadEmployeeResponse } from '../../types/ReadEmployeeResponse';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'pin', 'type', 'currentSalary'];
  dataSource: MatTableDataSource<ReadEmployeeResponse> = new MatTableDataSource<ReadEmployeeResponse>();
  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 5;

  constructor(
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.fetchData(0, this.defaultPageSize);
  }

  fetchData(pageIdx: number, pageSize: number) {
    this.employeeService.read(pageIdx, pageSize).subscribe(page => {
      console.log(page);
      this.pageNum = page.pageable.pageNumber;
      this.pageSize = page.pageable.pageSize;
      this.totalPages = page.totalPages;
      this.dataSource = new MatTableDataSource<ReadEmployeeResponse>(page.content);
    });
  }

  onSelectPage(event: any) {
    this.fetchData(event.pageIndex, event.pageSize);
  }
}

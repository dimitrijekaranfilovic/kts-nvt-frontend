import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationService } from 'src/app/modules/shared/services/confirmation-service/confirmation.service';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { SuperUserService } from '../../services/super-user-servoce/super-user.service';
import { ReadSuperusersRequest } from '../../types/ReadSuperUsersRequest';
import { ReadSuperUsersResponse } from '../../types/ReadSuperUsersResponse';

@Component({
  selector: 'app-super-users-table',
  templateUrl: './super-users-table.component.html',
  styleUrls: ['./super-users-table.component.scss']
})
export class SuperUsersTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'email', 'type', 'currentSalary', 'actions'];
  dataSource: MatTableDataSource<ReadSuperUsersResponse> = new MatTableDataSource<ReadSuperUsersResponse>();
  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 10;
  searchParams: ReadSuperusersRequest = {};

  constructor(
    private superUserService: SuperUserService,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService,
    private dialogService: MatDialog) { }

  ngOnInit(): void {
    this.fetchData(0, this.defaultPageSize);
  }

  fetchData(pageIdx: number, pageSize: number): void {
    this.superUserService.read(pageIdx, pageSize, this.searchParams).subscribe(page => {
      this.pageNum = page.pageable.pageNumber;
      this.pageSize = page.pageable.pageSize;
      this.totalPages = page.totalPages;
      this.dataSource.data = page.content;
    });
  }

  onSelectPage(event: any): void {
    this.fetchData(event.pageIndex, event.pageSize);
  }

  onSearchSuperUsers(params: ReadSuperusersRequest): void {
    this.searchParams = params;
    this.fetchData(0, this.pageSize);
  }

}

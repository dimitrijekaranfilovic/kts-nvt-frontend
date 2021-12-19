import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observer } from 'rxjs';
import { ConfirmationService } from 'src/app/modules/shared/services/confirmation-service/confirmation.service';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { SuperUserService } from '../../services/super-user-servoce/super-user.service';
import { ReadSuperusersRequest } from '../../types/ReadSuperUsersRequest';
import { ReadSuperUsersResponse } from '../../types/ReadSuperUsersResponse';
import { CreateSuperUserDialogComponent } from '../create-super-user-dialog/create-super-user-dialog.component';
import { UpdateSuperUserSalaryDialogComponent } from '../update-super-user-salary-dialog/update-super-user-salary-dialog.component';

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

  onDeleteSuperUser(superUser: ReadSuperUsersResponse): void {
    this.confirmationService.confirm({
      title: `Super user deletion`,
      message: `Are you sure you want to delete super user ${superUser.name} ${superUser.surname} with email ${superUser.email}?`,
      yes: 'Yes',
      no: 'No'
    }).subscribe(confirmation => {
      if (confirmation) {
        const nextPage = this.pageSize == 1 && this.pageNum > 0 ? this.pageNum - 1 : this.pageNum;
        this.superUserService.delete(superUser.id).subscribe(this.getDefaultEntityServiceHandler(nextPage));
      }
    })
  }

  onCreateSuperUser(): void {
    this.dialogService.open(CreateSuperUserDialogComponent).componentInstance.onSaveChanges.subscribe(created => {
      this.superUserService.create(created).subscribe(this.getDefaultEntityServiceHandler());
    })
  }

  onUpdateSalary(superUser: ReadSuperUsersResponse): void {
    this.dialogService.open(UpdateSuperUserSalaryDialogComponent, { data: superUser }).componentInstance.onSalaryUpdate.subscribe(salary => {
      this.superUserService.updateSalary(superUser.id, { amount: salary }).subscribe(this.getDefaultEntityServiceHandler());
    });
  }

  getDefaultEntityServiceHandler<TResponse = void>(page?: number): Partial<Observer<TResponse>> {
    return {
      next: _ => {
        this.fetchData(page ?? this.pageNum, this.pageSize);
      },
      error: err => this.errorService.handle(err)
    };
  }

}

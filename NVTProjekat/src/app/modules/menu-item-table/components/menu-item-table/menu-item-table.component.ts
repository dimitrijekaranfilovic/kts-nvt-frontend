import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observer } from 'rxjs';
import { ConfirmationService } from 'src/app/modules/shared/services/confirmation-service/confirmation.service';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { MenuItemTableService } from '../../services/menu-item-table-service/menu-item-table.service';
import { ReadMenuItemRequest } from '../../types/ReadMenuItemRequest';
import { ReadMenuItemResponse } from '../../types/ReadMenuItemResponse';

@Component({
  selector: 'app-menu-item-table',
  templateUrl: './menu-item-table.component.html',
  styleUrls: ['./menu-item-table.component.scss'],
})
export class MenuItemTableComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'allergies',
    'category',
    'price',
    'actions',
  ];
  dataSource: MatTableDataSource<ReadMenuItemResponse> =
    new MatTableDataSource<ReadMenuItemResponse>();
  searchParams: ReadMenuItemRequest = {};
  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 10;
  totalElements: number = 0;

  constructor(
    private menuItemService: MenuItemTableService,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService,
    private dialogService: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData(0, this.defaultPageSize);
  }

  fetchData(pageIdx: number, pageSize: number): void {
    this.menuItemService
      .read(pageIdx, pageSize, this.searchParams)
      .subscribe((page) => {
        this.pageNum = page.pageable.pageNumber;
        this.pageSize = page.pageable.pageSize;
        this.totalPages = page.totalPages;
        this.dataSource.data = page.content;
        this.totalElements = page.totalElements;
      });
  }

  onSelectPage(event: any): void {
    this.fetchData(event.pageIndex, event.pageSize);
  }

  onSearchMenuItem(params: ReadMenuItemRequest): void {
    this.searchParams = params;
    this.fetchData(0, this.pageSize);
  }

  onDeactivateMenuItem(menuItem: ReadMenuItemResponse): void {
    this.confirmationService
      .confirm({
        title: `Menu item deactivation`,
        message: `Are you sure you want to deactivate menu item ${menuItem.itemName}?`,
        yes: 'Yes',
        no: 'No',
      })
      .subscribe((confirmation) => {
        if (confirmation) {
          const nextPage =
            this.pageSize == 1 && this.pageNum > 0
              ? this.pageNum - 1
              : this.pageNum;
          this.menuItemService
            .deactivate(menuItem.id)
            .subscribe(this.getDefaultEntityServiceHandler(nextPage));
        }
      });
  }

  getDefaultEntityServiceHandler<TResponse = void>(
    page?: number
  ): Partial<Observer<TResponse>> {
    return {
      next: (_) => {
        this.fetchData(page ?? this.pageNum, this.pageSize);
      },
      error: (err) => this.errorService.handle(err),
    };
  }
}

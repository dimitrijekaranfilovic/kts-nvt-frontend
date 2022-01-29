import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observer } from 'rxjs';
import { InventoryItemService } from '../../services/inventory-item.service';
import { ReadInventoryItemRequest } from '../../types/ReadInventoryItemRequest';
import { ReadInventoryItemResponse } from '../../types/ReadInventoryItemResponse';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { ConfirmationService } from 'src/app/modules/shared/services/confirmation-service/confirmation.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateInventoryItemComponent } from '../create-update-inventory-item/create-update-inventory-item.component';
import { AddMenuItemComponent } from '../add-menu-item/add-menu-item.component';

@Component({
  selector: 'app-inventory-item-table',
  templateUrl: './inventory-item-table.component.html',
  styleUrls: ['./inventory-item-table.component.scss'],
})
export class InventoryItemTableComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'allergies',
    'category',
    'currentPrice',
    'isInMenu',
    'actions',
  ];
  dataSource: MatTableDataSource<ReadInventoryItemResponse> =
    new MatTableDataSource<ReadInventoryItemResponse>();
  searchParams: ReadInventoryItemRequest = {};
  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 10;
  totalElements: number = 0;
  waitingResults: boolean = true;

  constructor(
    private inventoryItemService: InventoryItemService,
    private confirmationService: ConfirmationService,
    private errorService: ErrorService,
    private dialogService: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData(0, this.defaultPageSize);
  }

  fetchData(pageIdx: number, pageSize: number): void {
    this.waitingResults = true;
    this.inventoryItemService
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

  onSearchInventoryItem(params: ReadInventoryItemRequest): void {
    this.searchParams = params;
    this.fetchData(0, this.pageSize);
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

  onDeleteInventoryItem(inventoryItem: ReadInventoryItemResponse): void {
    this.waitingResults = true;
    this.confirmationService
      .confirm({
        title: `Inventory item deletion`,
        message: `Are you sure you want to delete inventory item ${inventoryItem.name}?`,
        yes: 'Yes',
        no: 'No',
      })
      .subscribe((confirmation) => {
        if (confirmation) {
          const nextPage =
            this.pageSize == 1 && this.pageNum > 0
              ? this.pageNum - 1
              : this.pageNum;
          this.inventoryItemService
            .delete(inventoryItem.id)
            .subscribe(this.getDefaultEntityServiceHandler(nextPage));
        } else {
          this.waitingResults = false;
        }
      });
  }

  onCreateInventoryItem(): void {
    this.waitingResults = true;
    this.dialogService
      .open(CreateUpdateInventoryItemComponent, {
        data: {
          id: 0,
          name: '',
          basePrice: 0,
          description: '',
          allergies: '',
          category: 'FOOD',
          image: '',
        },
      })
      .componentInstance.onSaveChanges.subscribe((created) => {
        this.waitingResults = true;
        this.inventoryItemService
          .create(created)
          .subscribe(this.getDefaultEntityServiceHandler());
      });
  }

  onAddMenuItem(inventoryItem: ReadInventoryItemResponse): void {
    this.waitingResults = true;
    this.dialogService
      .open(AddMenuItemComponent, { data: inventoryItem })
      .componentInstance.onPriceUpdate.subscribe((price) => {
        this.inventoryItemService
          .addMenuItem({ inventoryItemId: inventoryItem.id, price: price })
          .subscribe(this.getDefaultEntityServiceHandler());
      });
  }

  onUpdateInventoryItem(inventoryItem: ReadInventoryItemResponse): void {
    this.waitingResults = true;
    this.dialogService
      .open(CreateUpdateInventoryItemComponent, { data: inventoryItem })
      .componentInstance.onSaveChanges.subscribe((updated) => {
        this.inventoryItemService
          .update(inventoryItem.id, updated)
          .subscribe(this.getDefaultEntityServiceHandler());
      });
  }
}

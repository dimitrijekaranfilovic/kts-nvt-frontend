import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryItemService } from '../../services/inventory-item.service';
import { ReadInventoryItemRequest } from '../../types/ReadInventoryItemRequest';
import { ReadInventoryItemResponse } from '../../types/ReadInventoryItemResponse';

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
    'actions',
  ];
  dataSource: MatTableDataSource<ReadInventoryItemResponse> =
    new MatTableDataSource<ReadInventoryItemResponse>();
  searchParams: ReadInventoryItemRequest = {};
  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 10;

  constructor(private inventoryItemService: InventoryItemService) {}

  ngOnInit(): void {
    this.fetchData(0, this.defaultPageSize);
  }

  fetchData(pageIdx: number, pageSize: number): void {
    this.inventoryItemService
      .read(pageIdx, pageSize, this.searchParams)
      .subscribe((page) => {
        this.pageNum = page.pageable.pageNumber;
        this.pageSize = page.pageable.pageSize;
        this.totalPages = page.totalPages;
        this.dataSource.data = page.content;
      });
  }

  onSelectPage(event: any): void {
    this.fetchData(event.pageIndex, event.pageSize);
  }
}

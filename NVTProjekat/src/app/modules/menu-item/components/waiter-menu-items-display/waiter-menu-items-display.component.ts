import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginatedResponse } from 'src/app/modules/shared/types/PaginatedResponse';
import { MenuItemService } from '../../services/menu-item.service';
import { MenuItem } from '../../types/MenuItem';

@Component({
  selector: 'app-waiter-menu-items-display',
  templateUrl: './waiter-menu-items-display.component.html',
  styleUrls: ['./waiter-menu-items-display.component.scss'],
})
export class WaiterMenuItemsDisplayComponent implements OnInit {
  public content: MenuItem[] = [];
  public currentPage: number = 0;
  public totalPages: number = 0;
  public totalElements: number = 0;
  public pageSize: number = 2;

  constructor(private menuItemService: MenuItemService) {}

  ngOnInit(): void {
    this.menuItemService
      .getPaginatedMenuItems('', this.currentPage, this.pageSize, 'item.name')
      .subscribe((response) => {
        this.content = response.content;
        this.currentPage = 0;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
      });
  }

  handlePageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.menuItemService
      .getPaginatedMenuItems('', this.currentPage, this.pageSize, 'item.name')
      .subscribe((response) => {
        this.content = response.content;
      });
  }
}

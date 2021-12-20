import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/modules/shared/types/PaginatedResponse';
import { MenuItemService } from '../../services/menu-item.service';
import { MenuItem } from '../../types/MenuItem';
import { OrderItemGroupReducedInfo } from 'src/app/modules/order/types/OrderItemGroupReducedInfo';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddMenuItemToExistingGroup } from '../../types/AddMenuItemToExistingGroup';
import { AddMenuItemToExistingGroupDialogComponent } from '../add-menu-item-to-existing-group-dialog/add-menu-item-to-existing-group-dialog.component';
import { OrderItemServiceService } from 'src/app/modules/order/services/order-item-service.service';
import { OrderGroupItem } from 'src/app/modules/order/types/OrderGroupItem';
import { AddOrderItem } from 'src/app/modules/order/types/AddOrderItem';

@Component({
  selector: 'app-waiter-menu-items-display',
  templateUrl: './waiter-menu-items-display.component.html',
  styleUrls: ['./waiter-menu-items-display.component.scss'],
})
export class WaiterMenuItemsDisplayComponent implements OnInit {
  @Input() public groups: OrderItemGroupReducedInfo[] = [];
  public menuItemName: string = '';
  public content: MenuItem[] = [];
  public currentPage: number = 0;
  public totalPages: number = 0;
  public totalElements: number = 0;
  public pageSize: number = 3;
  public pin: string = '';
  public amount: number = 0;

  constructor(
    private menuItemService: MenuItemService,
    private orderItemService: OrderItemServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.search();
  }

  handlePageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getMenuItems().subscribe((response) => {
      this.content = response.content;
    });
  }

  getMenuItems(): Observable<PaginatedResponse<MenuItem>> {
    return this.menuItemService.getPaginatedMenuItems(
      this.menuItemName,
      this.currentPage,
      this.pageSize,
      'item.name'
    );
  }

  addOrderItem(
    orderItemGroupId: number,
    menuItemId: number,
    amount: number,
    pin: string
  ): void {
    this.orderItemService
      .addOrderItem(orderItemGroupId, menuItemId, amount, pin)
      .subscribe({
        next: (result) => {
          const data: AddOrderItem = {
            // orderItem: {
            //   id: result.id,
            //   amount: result.amount,
            //   itemPrice: result.itemPrice,
            //   itemItemName: result.itemName,
            // },
            orderItem: result,
            groupId: orderItemGroupId,
          };
          this.orderItemService.emitAddOrderItemSubject(data);
          this.toast('Item succesfully added.');
        },
        error: (error) => {
          let message = error.error.errors[Object.keys(error.error.errors)[0]];
          if (message === undefined) {
            message = error.error.message;
          }
          this.toast(message);
        },
      });
  }

  search(): void {
    this.getMenuItems().subscribe((response) => {
      this.content = response.content;
      this.currentPage = 0;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
    });
  }

  openAddItemToExistingGroupDialog(event: AddMenuItemToExistingGroup): void {
    const dialogRef = this.dialog.open(
      AddMenuItemToExistingGroupDialogComponent,
      {
        width: '250px',
        data: { pin: this.pin, amount: this.amount },
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log(event);
      console.log(result);
      if (result.event === 'CANCEL') {
        return;
      }
      this.addOrderItem(
        event.groupdId,
        event.menuItemId,
        result.amount,
        result.pin
      );
    });
  }

  toast(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      verticalPosition: 'bottom',
    });
  }
}

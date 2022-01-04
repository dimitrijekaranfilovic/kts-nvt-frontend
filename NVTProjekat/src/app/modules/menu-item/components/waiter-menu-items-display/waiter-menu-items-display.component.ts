import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { PaginatedResponse } from 'src/app/modules/shared/types/PaginatedResponse';
import { MenuItemService } from '../../services/menu-item.service';
import { MenuItem } from '../../types/MenuItem';
import { OrderItemGroupReducedInfo } from 'src/app/modules/order/types/OrderItemGroupReducedInfo';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddMenuItem } from '../../types/AddMenuItem';
import { AddMenuItemToExistingGroupDialogComponent } from '../add-menu-item-to-existing-group-dialog/add-menu-item-to-existing-group-dialog.component';
import { OrderItemServiceService } from 'src/app/modules/order/services/order-item-service.service';
import { AddOrderItem } from 'src/app/modules/order/types/AddOrderItem';
import { AddMenuItemToNewGroupDialogComponent } from '../add-menu-item-to-new-group-dialog/add-menu-item-to-new-group-dialog.component';
import { OrderService } from 'src/app/modules/order/services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-waiter-menu-items-display',
  templateUrl: './waiter-menu-items-display.component.html',
  styleUrls: ['./waiter-menu-items-display.component.scss'],
})
export class WaiterMenuItemsDisplayComponent implements OnInit {
  @Input() public groups: OrderItemGroupReducedInfo[] = [];
  @Input() public orderId!: number;
  private onOrderItemGroupAddedSubscription!: Subscription;
  private onOrderItemGroupDeletedSubscription!: Subscription;

  form!: FormGroup;
  public menuItemName: string = '';
  public content: MenuItem[] = [];
  public currentPage: number = 0;
  public totalPages: number = 0;
  public totalElements: number = 0;
  public pageSize: number = 5;
  public pin: string = '';
  public amount: number = 0;
  public groupName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private menuItemService: MenuItemService,
    private orderItemService: OrderItemServiceService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      itemName: [this.menuItemName],
    });
    this.onOrderItemGroupAddedSubscription = this.orderService
      .onOrderItemGroupAdded()
      .subscribe((result) =>
        this.groups.push({
          id: result.id,
          name: result.name,
        })
      );
    this.onOrderItemGroupDeletedSubscription = this.orderService
      .onOrderItemGroupDeleted()
      .subscribe((result) => {
        this.groups = this.groups.filter((item) => item.id !== result);
      });
  }

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
      //this.menuItemName,
      this.form.value.itemName,
      this.currentPage,
      this.pageSize,
      'item.name'
    );
  }

  addOrderItem(
    orderItemGroupId: number | undefined,
    menuItemId: number,
    amount: number,
    pin: string
  ): void {
    this.orderItemService
      .addOrderItem(orderItemGroupId, menuItemId, amount, pin)
      .subscribe({
        next: (result) => {
          const data: AddOrderItem = {
            orderItem: result,
            groupId: orderItemGroupId,
          };
          this.orderItemService.emitOrderItemAdded(data);
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

  openAddItem(event: AddMenuItem): void {
    //ako se dodaje u postojecu grupu
    if (event.groupdId) {
      const dialogRef = this.dialog.open(
        AddMenuItemToExistingGroupDialogComponent,
        {
          width: '250px',
          data: { pin: this.pin, amount: this.amount },
        }
      );
      dialogRef.afterClosed().subscribe((result) => {
        if (!result) return;
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
    //ako se dodaje u novu grupu
    else {
      const dialogRef = this.dialog.open(AddMenuItemToNewGroupDialogComponent, {
        width: '250px',
        data: { pin: this.pin, amount: this.amount, groupName: this.groupName },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (!result) return;

        if (result.event === 'CANCEL') {
          return;
        }

        //kreiraj grupu, pa kreiraj order item
        this.orderService
          .createOrderItemGroup(this.orderId, result.groupName, result.pin)
          .subscribe({
            next: (groupResult) => {
              this.orderService.emitOrderItemGroupAdded(groupResult);
              this.addOrderItem(
                groupResult.id,
                event.menuItemId,
                result.amount,
                result.pin
              );
            },
            error: (error) => {
              let message =
                error.error.errors[Object.keys(error.error.errors)[0]];
              if (message === undefined) {
                message = error.error.message;
              }
              this.toast(message);
            },
          });
      });
    }
  }

  toast(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      verticalPosition: 'bottom',
    });
  }
}

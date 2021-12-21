import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderItemGroup } from '../../types/OrderItemGroup';
import { MatDialog } from '@angular/material/dialog';
import { PinModalComponent } from '../pin-modal/pin-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderItemGroupReducedInfo } from '../../types/OrderItemGroupReducedInfo';
import { OrderItemServiceService } from '../../services/order-item-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-item-groups-view',
  templateUrl: './order-item-groups-view.component.html',
  styleUrls: ['./order-item-groups-view.component.scss'],
})
export class OrderItemGroupsViewComponent implements OnInit {
  @Input() orderId!: number;
  @Output() onGroupsLoaded = new EventEmitter<OrderItemGroupReducedInfo[]>();
  public orderItemGroups: OrderItemGroup[] = [];
  private pin: string = '';
  private orderItemAddedSubscription!: Subscription;
  private orderItemGroupAddedSubscription!: Subscription;

  constructor(
    private orderService: OrderService,
    private orderItemService: OrderItemServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.orderItemAddedSubscription = this.orderItemService
      .onOrderItemAdded()
      .subscribe((value) => {
        this.orderItemGroups
          .find((item) => item.id === value.groupId)
          ?.orderItems.push(value.orderItem);
      });
    this.orderItemGroupAddedSubscription = this.orderService
      .onOrderItemGroupAdded()
      .subscribe((value) => {
        this.orderItemGroups.push(value);
      });
  }

  ngOnInit(): void {
    this.orderService.getOrderItemGroups(this.orderId).subscribe((response) => {
      this.orderItemGroups = response;
      this.onGroupsLoaded.emit(this.getReducedGroups());
    });
  }

  getReducedGroups(): OrderItemGroupReducedInfo[] {
    return this.orderItemGroups.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
  }

  sendGroup(group: OrderItemGroup, pin: string): void {
    this.orderService
      .sendOrderItemGroup(this.orderId, group.id, pin)
      .subscribe({
        next: () => {
          group.status = 'SENT';
          this.toast(`${group.name} successfully sent.`);
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

  deleteGroup(group: OrderItemGroup, pin: string): void {
    this.orderService
      .deleteOrderItemGroup(this.orderId, group.id, pin)
      .subscribe({
        next: () => {
          this.orderItemGroups = this.orderItemGroups.filter(
            (item) => item.id !== group.id
          );
          this.toast(`${group.name} successfully deleted.`);
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

  toast(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      verticalPosition: 'bottom',
    });
  }

  openDialog(group: OrderItemGroup, action: string): void {
    const dialogRef = this.dialog.open(PinModalComponent, {
      width: '250px',
      data: { pin: this.pin },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'CANCEL') {
        return;
      }
      if (action === 'SEND') this.sendGroup(group, result);
      else if (action === 'DELETE') this.deleteGroup(group, result);
    });
  }

  openChangeOrderStatusDialog(action: string): void {
    const dialogRef = this.dialog.open(PinModalComponent, {
      width: '250px',
      data: { pin: this.pin },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'CANCEL') {
        return;
      }
      if (action === 'CHARGE') {
        this.orderService.chargeOrder(this.orderId, result).subscribe({
          next: () => {
            //TODO: ovdje vidi hoce li redirect na prethodnu stranicu
            this.toast(`Order ${this.orderId} successfully charged.`);
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
      } else if (action === 'CANCEL') {
        this.orderService.cancelOrder(this.orderId, result).subscribe({
          next: () => {
            //TODO: ovdje vidi hoce li redirect na prethodnu stranicu
            this.toast(`Order ${this.orderId} successfully cancelled.`);
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
      }
    });
  }

  changeOrderStatus(action: string) {
    if (action === 'CHARGE') {
    }
  }
}

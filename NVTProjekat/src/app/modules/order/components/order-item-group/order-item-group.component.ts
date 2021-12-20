import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderGroupItem } from '../../types/OrderGroupItem';
import { OrderItemGroup } from '../../types/OrderItemGroup';
import { MatDialog } from '@angular/material/dialog';
import { PinModalComponent } from '../pin-modal/pin-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderItemServiceService } from '../../services/order-item-service.service';
import { UpdateItemModalComponent } from '../update-item-modal/update-item-modal.component';

@Component({
  selector: 'app-order-item-group',
  templateUrl: './order-item-group.component.html',
  styleUrls: ['./order-item-group.component.scss'],
})
export class OrderItemGroupComponent implements OnInit {
  @Input() group!: OrderItemGroup;
  @Output() public onGroupSent = new EventEmitter<OrderItemGroup>();
  @Output() public onGroupDeleted = new EventEmitter<OrderItemGroup>();
  private pin: string = '';
  private newAmount: number = 0;

  constructor(
    private orderItemService: OrderItemServiceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  getGroupIcon(): string {
    if (this.group.status === 'NEW') return 'delete_forever';
    else if (this.group.status === 'SENT') return 'hourglass_full';
    else return 'done_all';
  }

  getGroupIconColor(): string {
    if (this.group.status === 'NEW') return 'red';
    else if (this.group.status === 'SENT') return 'orange';
    else return 'green';
  }

  getGroupTooltip(): string {
    if (this.group.status === 'NEW') return 'Delete group';
    else if (this.group.status === 'SENT') return 'Group pending';
    else return 'Group prepared';
  }

  handleSendGroupButtonClick(): void {
    this.onGroupSent.emit(this.group);
  }

  deleteOrderItem(orderItem: OrderGroupItem, pin: string): void {
    this.orderItemService.deleteOrderItem(orderItem.id, pin).subscribe({
      next: () => {
        this.group.orderItems = this.group.orderItems.filter(
          (item) => item.id !== orderItem.id
        );
        this.toast('Order item successfully deleted.');
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

  updateOrderItem(orderItem: OrderGroupItem, pin: string, newAmount: number) {
    this.orderItemService
      .updateOrderItem(orderItem.id, pin, newAmount)
      .subscribe({
        next: () => {
          orderItem.amount = newAmount;
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

  deleteOrderItemGroup(): void {
    this.onGroupDeleted.emit(this.group);
  }

  toast(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      verticalPosition: 'bottom',
    });
  }

  openDeleteDialog(item: OrderGroupItem): void {
    const dialogRef = this.dialog.open(PinModalComponent, {
      width: '250px',
      data: { pin: this.pin },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'CANCEL') {
        return;
      }
      this.deleteOrderItem(item, result);
    });
  }

  openUpdateDialog(item: OrderGroupItem): void {
    const dialogRef = this.dialog.open(UpdateItemModalComponent, {
      width: '250px',
      data: { pin: this.pin, newAmount: this.newAmount },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'CANCEL') {
        return;
      }
      this.updateOrderItem(item, result.pin, result.newAmount);
    });
  }
}

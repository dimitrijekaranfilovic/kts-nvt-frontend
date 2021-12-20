import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderItemGroup } from '../../types/OrderItemGroup';
import { MatDialog } from '@angular/material/dialog';
import { PinModalComponent } from '../pin-modal/pin-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-item-groups-view',
  templateUrl: './order-item-groups-view.component.html',
  styleUrls: ['./order-item-groups-view.component.scss'],
})
export class OrderItemGroupsViewComponent implements OnInit {
  @Input() orderId!: number;
  public orderItemGroups: OrderItemGroup[] = [];
  private pin: string = '';

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.orderService
      .getOrderItemGroups(this.orderId)
      .subscribe((response) => (this.orderItemGroups = response));
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

  toast(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      verticalPosition: 'bottom',
    });
  }

  openDialog(group: OrderItemGroup): void {
    const dialogRef = this.dialog.open(PinModalComponent, {
      width: '250px',
      data: { pin: this.pin },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'CANCEL') {
        return;
      }

      this.sendGroup(group, result);
    });
  }
}

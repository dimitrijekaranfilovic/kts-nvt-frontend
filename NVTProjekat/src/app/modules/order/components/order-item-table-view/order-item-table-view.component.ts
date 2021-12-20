import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OrderItemServiceService } from '../../services/order-item-service.service';
import { OrderItem } from '../../types/OrderItem';
import { PinModalComponent } from '../pin-modal/pin-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-item-table-view',
  templateUrl: './order-item-table-view.component.html',
  styleUrls: ['./order-item-table-view.component.scss']
})
export class OrderItemTableViewComponent implements OnInit {

  @Input() itemStatus: string = "";
  @Input() itemType: string = "";

  displayedColumns: string[] = ['item', 'amount', 'sentAt', 'takenAt', 'takenBy','action1', 'action2'];
  dataSource!: MatTableDataSource<OrderItem>;
  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 5;

  subscription: any;
  pin: string = "";

  constructor(private orderItemService: OrderItemServiceService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  fetchData(pageIdx: number, pageSize: number) {
    this.orderItemService.getOrderItemRequests(pageIdx, pageSize, this.itemStatus, this.itemType).subscribe( pageable => {
      this.pageNum = pageable.pageable.pageNumber;
      this.pageSize = pageable.pageable.pageSize;
      this.totalPages = pageable.totalPages;
      this.dataSource = new MatTableDataSource<OrderItem>(pageable.content);
    });
  }

  ngOnInit(): void {
    this.fetchData(0, this.defaultPageSize);
    this.subscription = this.orderItemService.getEmitter()
      .subscribe(() => this.fetchData(0, this.defaultPageSize));
  }

  onSelectPage(event: any) {
    this.fetchData(event.pageIndex, event.pageSize);
  }

  onAction(item: OrderItem, action: string, pin: string){
    this.orderItemService.takeOrderItem({ action: action, employeePin: pin, itemId: item.id}).subscribe({
      next: () => {
      this.fetchData(0, this.defaultPageSize);
      this.orderItemService.emitUpdateTableEvent();
      },
      error: (error) => {
        let message = error.error.errors[Object.keys(error.error.errors)[0]];
        if (message === undefined){
          message = error.error.message;
        }
        this.toast(message);
      }});
  }

  openDialog(item:OrderItem, action: string): void {
    const dialogRef = this.dialog.open(PinModalComponent, {
      width: '250px',
      data: {pin: this.pin}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.event === "CANCEL"){
        return;
      }
      this.onAction(item, action, result);
    });
  }

  toast(message: string) {
    this.snackBar.open(message, "Dismiss", {duration: 5000, verticalPosition: "bottom"});
  }
}
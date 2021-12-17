import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { OrderItemServiceService } from '../../services/order-item-service.service';
import { OrderItem } from '../../types/OrderItem';

@Component({
  selector: 'app-order-item-table-view',
  templateUrl: './order-item-table-view.component.html',
  styleUrls: ['./order-item-table-view.component.scss']
})
export class OrderItemTableViewComponent implements OnInit {

  @Input() itemStatus: string = "";
  @Input() itemType: string = "";

  displayedColumns: string[] = ['item', 'amount', 'sentAt', 'takenAt', 'takenBy','action1', 'action2'];
  dataSource = new MatTableDataSource<OrderItem>();
  pageNum: number = 0;
  pageSize: number = 0;
  totalPages: number = 0;
  defaultPageSize: number = 5;

  subscription: any;

  constructor(private orderItemService: OrderItemServiceService) {}

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

  onFinish(item: OrderItem){
    this.orderItemService.takeOrderItem({ action: "FINISH", employeePin: "1234", itemId: item.id}).subscribe(() => this.fetchData(0, this.defaultPageSize));
  }

  onPrepare(item: OrderItem){
    this.orderItemService.takeOrderItem({ action: "PREPARE", employeePin: "1234", itemId: item.id}).subscribe(() => {
      this.fetchData(0, this.defaultPageSize);
      this.orderItemService.emitUpdateTableEvent();
    });
  }
}
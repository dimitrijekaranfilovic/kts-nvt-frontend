import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderGroupItem } from '../../types/OrderGroupItem';
import { OrderItem } from '../../types/OrderItem';

@Component({
  selector: 'app-order-group-item',
  templateUrl: './order-group-item.component.html',
  styleUrls: ['./order-group-item.component.scss'],
})
export class OrderGroupItemComponent {
  @Input() index: number = 0;
  @Input() orderItem!: OrderGroupItem;
  @Input() orderGroupStatus: string = 'NEW';
  @Output() public itemDeleted = new EventEmitter<OrderGroupItem>();
  @Output() public itemUpdated = new EventEmitter<OrderGroupItem>();

  deleteItem(): void {
    this.itemDeleted.emit(this.orderItem);
  }

  updateItem(): void {
    this.itemUpdated.emit(this.orderItem);
  }
}

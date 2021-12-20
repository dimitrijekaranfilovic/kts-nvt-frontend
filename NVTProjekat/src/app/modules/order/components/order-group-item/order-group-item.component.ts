import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderGroupItem } from '../../types/OrderGroupItem';
import { OrderItem } from '../../types/OrderItem';

@Component({
  selector: 'app-order-group-item',
  templateUrl: './order-group-item.component.html',
  styleUrls: ['./order-group-item.component.scss'],
})
export class OrderGroupItemComponent implements OnInit {
  @Input() index: number = 0;
  @Input() orderItem!: OrderGroupItem;
  @Input() orderGroupStatus: string = 'NEW';
  @Output() public onItemDeleted = new EventEmitter<OrderGroupItem>();
  @Output() public onItemUpdated = new EventEmitter<OrderGroupItem>();

  constructor() {}

  ngOnInit(): void {}

  deleteItem(): void {
    this.onItemDeleted.emit(this.orderItem);
  }

  updateItem(): void {
    this.onItemUpdated.emit(this.orderItem);
  }
}

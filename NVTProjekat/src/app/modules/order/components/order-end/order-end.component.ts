import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderItemGroup } from '../../types/OrderItemGroup';

@Component({
  selector: 'app-order-end',
  templateUrl: './order-end.component.html',
  styleUrls: ['./order-end.component.scss'],
})
export class OrderEndComponent {
  @Input() groups: OrderItemGroup[] = [];
  @Output() orderStatusChanged = new EventEmitter<string>();

  constructor() {}

  getTotalPrice(): number {
    return this.groups.reduce((totalGroups, currentGroup) => {
      let num = currentGroup.orderItems.reduce((totalItems, currentItem) => {
        totalItems += currentItem.amount * currentItem.itemPrice;
        return totalItems;
      }, 0);
      totalGroups += num;
      return totalGroups;
    }, 0);
  }

  isOrderNew(): boolean {
    //moze da se otkaze jedino ako nema grupa koje su SENT ili DONE
    return (
      this.groups.find(
        (item) => item.status === 'SENT' || item.status === 'DONE'
      ) === undefined
    );
  }

  isOrderDone(): boolean {
    //moze da se naplati jedino ako su sve grupe DONE
    return (
      this.groups.filter((item) => item.status === 'DONE').length ===
      this.groups.length
    );
  }

  changeOrderStatus(action: string) {
    this.orderStatusChanged.emit(action);
  }
}

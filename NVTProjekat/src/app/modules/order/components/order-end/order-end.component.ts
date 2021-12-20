import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderItemGroup } from '../../types/OrderItemGroup';

@Component({
  selector: 'app-order-end',
  templateUrl: './order-end.component.html',
  styleUrls: ['./order-end.component.scss'],
})
export class OrderEndComponent implements OnInit {
  @Input() groups: OrderItemGroup[] = [];
  @Output() onOrderCharged = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

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
    return (
      this.groups.find(
        (item) => item.status === 'SENT' || item.status === 'DONE'
      ) === undefined
    );
  }

  chargeOrder(): void {
    this.onOrderCharged.emit();
  }
}

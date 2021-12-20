import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderItemGroup } from '../../types/OrderItemGroup';

@Component({
  selector: 'app-order-item-group',
  templateUrl: './order-item-group.component.html',
  styleUrls: ['./order-item-group.component.scss'],
})
export class OrderItemGroupComponent implements OnInit {
  @Input() group!: OrderItemGroup;
  @Output() public onGroupSent = new EventEmitter<OrderItemGroup>();

  constructor() {}

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
}

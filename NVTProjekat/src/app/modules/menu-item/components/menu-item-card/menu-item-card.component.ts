import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderItemGroupReducedInfo } from 'src/app/modules/order/types/OrderItemGroupReducedInfo';
import { AddMenuItemToExistingGroup } from '../../types/AddMenuItemToExistingGroup';
import { MenuItem } from '../../types/MenuItem';
@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.scss'],
})
export class MenuItemCardComponent implements OnInit {
  @Input() menuItem!: MenuItem;
  @Input() groups: OrderItemGroupReducedInfo[] = [];
  @Output() onMenuItemAdded = new EventEmitter<AddMenuItemToExistingGroup>();

  constructor() {}

  ngOnInit(): void {}

  addMenuItem(group: OrderItemGroupReducedInfo): void {
    const data: AddMenuItemToExistingGroup = {
      menuItemId: this.menuItem.id,
      groupdId: group.id,
    };
    this.onMenuItemAdded.emit(data);
  }
}

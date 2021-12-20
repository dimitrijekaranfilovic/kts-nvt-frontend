import { Component, OnInit, Input } from '@angular/core';
import { OrderItemGroupReducedInfo } from 'src/app/modules/order/types/OrderItemGroupReducedInfo';
import { MenuItem } from '../../types/MenuItem';
@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.scss'],
})
export class MenuItemCardComponent implements OnInit {
  @Input() menuItem!: MenuItem;
  @Input() groups: OrderItemGroupReducedInfo[] = [];

  constructor() {}

  ngOnInit(): void {}

  checkGroups(): void {
    console.log(this.groups);
  }
}

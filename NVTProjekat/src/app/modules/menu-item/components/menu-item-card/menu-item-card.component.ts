import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderItemGroupReducedInfo } from 'src/app/modules/order/types/OrderItemGroupReducedInfo';
import { AddMenuItem } from '../../types/AddMenuItem';
import { MenuItem } from '../../types/MenuItem';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.scss'],
})
export class MenuItemCardComponent implements OnInit {
  public imageSource: SafeResourceUrl = '';
  @Input() menuItem!: MenuItem;
  @Input() groups: OrderItemGroupReducedInfo[] = [];
  @Output() menuItemAdded = new EventEmitter<AddMenuItem>();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64,' + this.menuItem.itemImage
    );
  }

  addMenuItemToExistingGroup(group: OrderItemGroupReducedInfo): void {
    const data: AddMenuItem = {
      menuItemId: this.menuItem.id,
      groupdId: group.id,
    };
    this.menuItemAdded.emit(data);
  }

  addMenuItemToNewGroup(): void {
    const data: AddMenuItem = {
      menuItemId: this.menuItem.id,
      groupdId: undefined,
    };
    this.menuItemAdded.emit(data);
  }
}

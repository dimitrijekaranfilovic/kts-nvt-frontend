import { Component, Input, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderItemGroup } from '../../types/OrderItemGroup';

@Component({
  selector: 'app-order-item-groups-view',
  templateUrl: './order-item-groups-view.component.html',
  styleUrls: ['./order-item-groups-view.component.scss'],
})
export class OrderItemGroupsViewComponent implements OnInit {
  @Input() orderId!: number;
  public orderItemGroups: OrderItemGroup[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService
      .getOrderItemGroups(this.orderId)
      .subscribe((response) => (this.orderItemGroups = response));
  }
}

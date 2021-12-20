import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddOrderItem } from '../../types/AddOrderItem';
import { OrderGroupItem } from '../../types/OrderGroupItem';
import { OrderItemGroupReducedInfo } from '../../types/OrderItemGroupReducedInfo';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  public orderId!: number;
  public groups: OrderItemGroupReducedInfo[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
  }

  setGroups(groups: OrderItemGroupReducedInfo[]): void {
    this.groups = groups;
  }
}

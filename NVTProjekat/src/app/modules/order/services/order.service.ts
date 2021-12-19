import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItemGroup } from '../types/OrderItemGroup';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl: string = 'http://localhost:8081/api/orders';
  constructor(private httpClient: HttpClient) {}

  getOrderItemGroups(orderId: number): Observable<OrderItemGroup[]> {
    const url = `${this.baseUrl}/${orderId}/groups`;
    return this.httpClient.get<OrderItemGroup[]>(url);
  }
}

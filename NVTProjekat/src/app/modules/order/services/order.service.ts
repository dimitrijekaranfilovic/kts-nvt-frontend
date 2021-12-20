import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  sendOrderItemGroup(
    orderId: number,
    orderItemGroupId: number,
    pin: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${orderId}/groups/${orderItemGroupId}`;

    return this.httpClient.put(url, { pin });
  }

  deleteOrderItemGroup(
    orderId: number,
    orderItemGroupId: number,
    pin: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${orderId}/groups/${orderItemGroupId}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        pin: pin,
      },
    };
    return this.httpClient.delete(url, options);
  }
}

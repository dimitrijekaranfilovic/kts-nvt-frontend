import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OrderItemGroup } from '../types/OrderItemGroup';
import { OrderItemGroupReducedInfo } from '../types/OrderItemGroupReducedInfo';
import { environment } from 'src/environments/environment';
import { CreateOrderResponse } from '../types/CreateOrderResponse';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl: string = `${environment.basePath}/api/orders`;
  private groupsUpdatedSubject = new Subject<any>();
  constructor(private httpClient: HttpClient) { }
  private orderItemGroupAddedSubject = new Subject<any>();
  private orderItemGroupDeletedSubject = new Subject<any>();

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

  createOrderItemGroup(
    orderId: number,
    groupName: string,
    pin: string
  ): Observable<OrderItemGroupReducedInfo> {
    const url = `${this.baseUrl}/${orderId}/groups`;
    return this.httpClient.post<OrderItemGroupReducedInfo>(url, {
      groupName,
      pin,
    });
  }

  emitOrderItemGroupAdded(event: OrderItemGroupReducedInfo): void {
    const data = {
      id: event.id,
      name: event.name,
      status: 'NEW',
      orderItems: [],
    };
    this.orderItemGroupAddedSubject.next(data);
  }

  onOrderItemGroupAdded(): Observable<any> {
    return this.orderItemGroupAddedSubject.asObservable();
  }

  emitOrderItemGroupDeleted(groupId: number): void {
    this.orderItemGroupDeletedSubject.next(groupId);
  }

  onOrderItemGroupDeleted(): Observable<any> {
    return this.orderItemGroupDeletedSubject.asObservable();
  }

  chargeOrder(orderId: number, pin: string): Observable<any> {
    const url = `${this.baseUrl}/${orderId}/charge`;
    return this.httpClient.put(url, { pin });
  }

  cancelOrder(orderId: number, pin: string): Observable<any> {
    const url = `${this.baseUrl}/${orderId}/cancel`;
    return this.httpClient.put(url, { pin });
  }

  createOrder(tableId: number, pin: string): Observable<CreateOrderResponse> {
    return this.httpClient.post<CreateOrderResponse>(this.baseUrl, {
      pin,
      tableId,
    });
  }

  getOrderIdForTable(tableId: number): Observable<number> {
    const url = `${this.baseUrl}/for-table?tableId=${tableId}`;
    return this.httpClient.get<number>(url);
  }
}

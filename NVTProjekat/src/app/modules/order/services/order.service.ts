import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OrderItemGroup } from '../types/OrderItemGroup';
import { OrderItemGroupReducedInfo } from '../types/OrderItemGroupReducedInfo';
import { OrderItemServiceService } from './order-item-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl: string = `${environment.basePath}/api/orders`;
  private groupsUpdatedSubject = new Subject<any>();
  constructor(private httpClient: HttpClient) {}
  private orderItemGroupAddedSubject = new Subject<any>();

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
}

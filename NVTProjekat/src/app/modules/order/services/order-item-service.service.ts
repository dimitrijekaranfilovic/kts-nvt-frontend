import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { TakeOrderItemRequest } from '../types/TakeOrderItemRequest';
import { EventEmitter } from '@angular/core';
import { AddOrderItem } from '../types/AddOrderItem';

@Injectable({
  providedIn: 'root',
})
export class OrderItemServiceService {
  updateTable: EventEmitter<any> = new EventEmitter();
  addOrderItemSubject = new Subject<any>();

  constructor(private http: HttpClient) {}

  getOrderItemRequests(
    page: number,
    size: number,
    status: string,
    category: string
  ): Observable<any> {
    return this.http.get(
      `http://localhost:8081/api/order-items/requests?page=${page}&size=${size}&status=${status}&category=${category}`
    );
  }

  takeOrderItem(requestBody: TakeOrderItemRequest): Observable<any> {
    return this.http.put(
      'http://localhost:8081/api/order-items/take',
      requestBody
    );
  }

  emitUpdateTableEvent() {
    this.updateTable.emit(null);
  }

  getEmitter() {
    return this.updateTable;
  }
  deleteOrderItem(orderItemId: number, pin: string): Observable<any> {
    const url = `http://localhost:8081/api/order-items/${orderItemId}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        pin: pin,
      },
    };
    return this.http.delete(url, options);
  }

  updateOrderItem(
    orderItemId: number,
    pin: string,
    newAmount: number
  ): Observable<any> {
    const url = `http://localhost:8081/api/order-items/${orderItemId}`;
    return this.http.put(url, {
      pin: pin,
      amount: newAmount,
    });
  }

  addOrderItem(
    orderItemGroupId: number,
    menuItemId: number,
    amount: number,
    pin: string
  ): Observable<any> {
    const url = `http://localhost:8081/api/order-items`;
    return this.http.post(url, {
      orderItemGroupId,
      menuItemId,
      amount,
      pin,
    });
  }

  emitAddOrderItemSubject(event: AddOrderItem): void {
    this.addOrderItemSubject.next(event);
  }

  onOrderItemAdded(): Observable<any> {
    return this.addOrderItemSubject.asObservable();
  }
}

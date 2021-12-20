import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TakeOrderItemRequest } from '../types/TakeOrderItemRequest';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderItemServiceService {

  updateTable: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getOrderItemRequests(page: number, size: number, status: string, category: string): Observable<any>{
    return this.http.get(`backend/api/order-items/requests?page=${page}&size=${size}&status=${status}&category=${category}`);
  }

  takeOrderItem(requestBody: TakeOrderItemRequest): Observable<any>{
    return this.http.put("backend/api/order-items/take", requestBody);
  }

  emitUpdateTableEvent() {
    this.updateTable.emit(null);
  }

  getEmitter() {
    return this.updateTable;
  }
}

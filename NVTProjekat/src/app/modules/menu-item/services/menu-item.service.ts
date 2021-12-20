import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaginatedResponse } from '../../shared/types/PaginatedResponse';
import { MenuItem } from '../types/MenuItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private baseUrl = 'http://localhost:8081/api/menu-items';
  constructor(private httpClient: HttpClient) {}

  getPaginatedMenuItems(
    menuItemName: string,
    page: number,
    size: number,
    sort: string
  ): Observable<PaginatedResponse<MenuItem>> {
    const url = `${this.baseUrl}?name=${menuItemName}&page=${page}&size=${size}&sort=${sort}`;
    return this.httpClient.get<PaginatedResponse<MenuItem>>(url);
  }
}

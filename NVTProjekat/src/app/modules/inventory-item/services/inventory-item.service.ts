import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginatedResponse } from '../../shared/types/PaginatedResponse';
import { ReadInventoryItemRequest } from '../types/ReadInventoryItemRequest';
import { ReadInventoryItemResponse } from '../types/ReadInventoryItemResponse';
import { CreateInventoryItemRequest } from '../types/CreateInventoryItemRequest';
import { CreateInventoryItemResponse } from '../types/CreateInventoryItemResponse';
import { UpdateInventoryItemRequest } from '../types/UpdateInventoryItemRequest';

@Injectable({
  providedIn: 'root',
})
export class InventoryItemService {
  constructor(private http: HttpClient) {}
  read(
    page: number,
    size: number,
    params: ReadInventoryItemRequest
  ): Observable<PaginatedResponse<ReadInventoryItemResponse>> {
    return this.http.get<PaginatedResponse<ReadInventoryItemResponse>>(
      `${environment.basePath}/api/inventory-items`,
      {
        params: {
          ...params,
          page: page,
          size: size,
          sort: 'id,asc',
        },
      }
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.basePath}/api/inventory-items/${id}`
    );
  }

  create(
    request: CreateInventoryItemRequest
  ): Observable<CreateInventoryItemResponse> {
    return this.http.post<CreateInventoryItemResponse>(
      `${environment.basePath}/api/inventory-items`,
      request
    );
  }

  update(id: number, request: UpdateInventoryItemRequest): Observable<void> {
    return this.http.put<void>(
      `${environment.basePath}/api/inventory-items/${id}`,
      request
    );
  }
}

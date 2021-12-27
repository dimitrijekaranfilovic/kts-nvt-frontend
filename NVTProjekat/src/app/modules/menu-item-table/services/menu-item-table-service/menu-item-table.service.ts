import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/modules/shared/types/PaginatedResponse';
import { environment } from 'src/environments/environment';
import { ReadMenuItemRequest } from '../../types/ReadMenuItemRequest';
import { ReadMenuItemResponse } from '../../types/ReadMenuItemResponse';

@Injectable({
  providedIn: 'root',
})
export class MenuItemTableService {
  constructor(private http: HttpClient) {}
  read(
    page: number,
    size: number,
    params: ReadMenuItemRequest
  ): Observable<PaginatedResponse<ReadMenuItemResponse>> {
    return this.http.get<PaginatedResponse<ReadMenuItemResponse>>(
      `${environment.basePath}/api/menu-items/search`,
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
}

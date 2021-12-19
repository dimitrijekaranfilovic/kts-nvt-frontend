import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/modules/shared/types/PaginatedResponse';
import { ReadSuperusersRequest } from '../../types/ReadSuperUsersRequest';
import { ReadSuperUsersResponse } from '../../types/ReadSuperUsersResponse';

@Injectable({
  providedIn: 'root'
})
export class SuperUserService {

  constructor(
    private http: HttpClient
  ) { }

  read(page: number, size: number, params: ReadSuperusersRequest): Observable<PaginatedResponse<ReadSuperUsersResponse>> {
    return this.http.get<PaginatedResponse<ReadSuperUsersResponse>>(`http://localhost:8081/api/super-users`, {
      params: {
        ...params,
        page: page,
        size: size,
        sort: 'id,asc'
      }
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/modules/shared/types/PaginatedResponse';
import { environment } from 'src/environments/environment';
import { CreateSuperUserRequest } from '../../types/CreateSuperUserRequest';
import { CreateSuperUserResponse } from '../../types/CreateSuperUserResponse';
import { ReadSuperusersRequest } from '../../types/ReadSuperUsersRequest';
import { ReadSuperUsersResponse } from '../../types/ReadSuperUsersResponse';
import { UpdatePasswordRequest } from '../../types/UpdatePasswordRequest';
import { UpdateSuperUserRequest } from '../../types/UpdateSuperUserRequest';
import { UpdateSuperUserSalaryRequest } from '../../types/UpdateSuperUserSalaryRequest';

@Injectable({
  providedIn: 'root'
})
export class SuperUserService {

  constructor(
    private http: HttpClient
  ) { }

  create(request: CreateSuperUserRequest): Observable<CreateSuperUserResponse> {
    return this.http.post<CreateSuperUserResponse>(`${environment.basePath}/api/super-users`, request);
  }

  read(page: number, size: number, params: ReadSuperusersRequest): Observable<PaginatedResponse<ReadSuperUsersResponse>> {
    return this.http.get<PaginatedResponse<ReadSuperUsersResponse>>(`${environment.basePath}/api/super-users`, {
      params: {
        ...params,
        page: page,
        size: size,
        sort: 'id,asc'
      }
    })
  }

  update(id: number, request: UpdateSuperUserRequest): Observable<void> {
    return this.http.put<void>(`http://localhost:8081/api/super-users/${id}`, request);
  }

  updateSalary(id: number, request: UpdateSuperUserSalaryRequest): Observable<void> {
    return this.http.put<void>(`${environment.basePath}/api/super-users/${id}/salary`, request);
  }

  updatePassword(id: number, request: UpdatePasswordRequest): Observable<void> {
    return this.http.put<void>(`http://localhost:8081/api/super-users/${id}/password`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.basePath}/api/super-users/${id}`);
  }
}

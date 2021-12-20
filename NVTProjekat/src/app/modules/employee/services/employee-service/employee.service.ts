import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/modules/shared/types/PaginatedResponse';
import { CreateEmployeeRequest } from '../../types/CreateEmployeeRequest';
import { CreateEmployeeResponse } from '../../types/CreateEmployeeResponse';
import { ReadEmployeeResponse } from '../../types/ReadEmployeeResponse';
import { ReadEmployeesRequest } from '../../types/ReadEmployeesRequest';
import { UpdateEmployeeRequest } from '../../types/UpdateEmployeeRequest';
import { UpdateSalaryRequest } from '../../types/UpdateSalaryRequest';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(
    private http: HttpClient
  ) { }

  create(request: CreateEmployeeRequest): Observable<CreateEmployeeResponse> {
    return this.http.post<CreateEmployeeResponse>(`backend/api/employees`, request);
  }

  read(page: number, size: number, params: ReadEmployeesRequest): Observable<PaginatedResponse<ReadEmployeeResponse>> {
    return this.http.get<PaginatedResponse<ReadEmployeeResponse>>(`backend/api/employees`, {
      params: {
        ...params,
        page: page,
        size: size,
        sort: 'id,asc'
      }
    })
  }

  update(id: number, request: UpdateEmployeeRequest): Observable<void> {
    return this.http.put<void>(`backend/api/employees/${id}`, request);
  }

  updateSalary(id: number, request: UpdateSalaryRequest): Observable<void> {
    return this.http.put<void>(`backend/api/employees/${id}/salary`, request)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`backend/api/employees/${id}`);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/modules/shared/types/PaginatedResponse';
import { environment } from 'src/environments/environment';
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
    return this.http.post<CreateEmployeeResponse>(`${environment.basePath}/api/employees`, request);
  }

  read(page: number, size: number, params: ReadEmployeesRequest): Observable<PaginatedResponse<ReadEmployeeResponse>> {
    return this.http.get<PaginatedResponse<ReadEmployeeResponse>>(`${environment.basePath}/api/employees`, {
      params: {
        ...params,
        page: page,
        size: size,
        sort: 'id,asc'
      }
    })
  }

  update(id: number, request: UpdateEmployeeRequest): Observable<void> {
    return this.http.put<void>(`${environment.basePath}/api/employees/${id}`, request);
  }

  updateSalary(id: number, request: UpdateSalaryRequest): Observable<void> {
    return this.http.put<void>(`${environment.basePath}/api/employees/${id}/salary`, request)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.basePath}/api/employees/${id}`);
  }
}

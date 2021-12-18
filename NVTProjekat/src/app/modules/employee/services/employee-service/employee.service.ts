import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/modules/shared/types/PaginatedResponse';
import { CreateEmployeeRequest } from '../../types/CreateEmployeeRequest';
import { CreateEmployeeResponse } from '../../types/CreateEmployeeResponse';
import { ReadEmployeeResponse } from '../../types/ReadEmployeeResponse';
import { UpdateEmployeeRequest } from '../../types/UpdateEmployeeRequest';
import { UpdateSalaryRequest } from '../../types/UpdateSalaryRequest';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(
    private http: HttpClient
  ) { }

  create(request: CreateEmployeeRequest): Observable<CreateEmployeeResponse> {
    return this.http.post<CreateEmployeeResponse>(`http://localhost:8081/api/employees`, request);
  }

  read(page: number, size: number): Observable<PaginatedResponse<ReadEmployeeResponse>> {
    return this.http.get<PaginatedResponse<ReadEmployeeResponse>>(`http://localhost:8081/api/employees`, {
      params: {
        page: page,
        size: size,
        sort: 'id,asc'
      }
    })
  }

  update(id: number, request: UpdateEmployeeRequest): Observable<void> {
    return this.http.put<void>(`http://localhost:8081/api/employees/${id}`, request);
  }

  updateSalary(id: number, request: UpdateSalaryRequest): Observable<void> {
    return this.http.put<void>(`http://localhost:8081/api/employees/${id}/salary`, request)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8081/api/employees/${id}`);
  }
}

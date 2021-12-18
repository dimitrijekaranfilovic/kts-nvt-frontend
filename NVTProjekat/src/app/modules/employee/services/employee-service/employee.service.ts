import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from 'src/app/modules/shared/types/PaginatedResponse';
import { ReadEmployeeResponse } from '../../types/ReadEmployeeResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  read(page: number, size: number): Observable<PaginatedResponse<ReadEmployeeResponse>> {
    return this.http.get<PaginatedResponse<ReadEmployeeResponse>>("http://localhost:8081/api/employees", {
      params: {
        page: page,
        size: size
      },
      responseType: "json"
    })
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8081/api/employees/${id}`);
  }
}

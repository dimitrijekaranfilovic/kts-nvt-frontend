import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReadReportsRequest } from '../../types/ReadReportsRequest';
import { ReadReportsResponse } from '../../types/ReadReportsResponse';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient
  ) { }

  readSalaryExpenses(request: ReadReportsRequest): Observable<ReadReportsResponse> {
    return this.http.get<ReadReportsResponse>(`${environment.basePath}/api/reports/salary-costs`, { params: { ...request } });
  }

  readOrderIncomes(request: ReadReportsRequest): Observable<ReadReportsResponse> {
    return this.http.get<ReadReportsResponse>(`${environment.basePath}/api/reports/order-incomes`, { params: { ...request } });
  }

  readOrderCosts(request: ReadReportsRequest): Observable<ReadReportsResponse> {
    return this.http.get<ReadReportsResponse>(`${environment.basePath}/api/reports/order-costs`, { params: { ...request } });
  }
}

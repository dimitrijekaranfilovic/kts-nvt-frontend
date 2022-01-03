import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateTableRequest } from '../../types/CreateTableRequest';
import { Table } from '../../types/Table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  createTable(table: CreateTableRequest, sectionId: number): Observable<Table> {
    return this.http.post<Table>(`${environment.basePath}/api/sections/${sectionId}/tables`, table);
  }

  deleteTable(tableId: number): Observable<void> {
    return this.http.delete<void>(`${environment.basePath}/api/sections/tables/${tableId}`);
  }
}

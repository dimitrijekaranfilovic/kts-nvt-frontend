import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from '../types/Section';
import { environment } from 'src/environments/environment';
import { Table } from '../types/Table';

@Injectable({
  providedIn: 'root'
})
export class WaiterSectionServiceService {

  constructor(private http: HttpClient) { }

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(`${environment.basePath}/api/sections`);
  }

  getTablesForSection(id: number): Observable<Table[]> {
    return this.http.get<Table[]>(`${environment.basePath}/api/sections/${id}/tables`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateSectionRequest } from '../../types/CreateSectionRequest';
import { CreateSectionResponse } from '../../types/CreateSectionResponse';
import { ReadSectionResponse } from '../../types/ReadSectionResponse';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(
    private http: HttpClient
  ) { }

  create(request: CreateSectionRequest): Observable<CreateSectionResponse> {
    return this.http.post<CreateSectionResponse>(`${environment.basePath}/api/sections`, request);
  }

  read(): Observable<ReadSectionResponse[]> {
    return this.http.get<ReadSectionResponse[]>(`${environment.basePath}/api/sections`);
  }
}

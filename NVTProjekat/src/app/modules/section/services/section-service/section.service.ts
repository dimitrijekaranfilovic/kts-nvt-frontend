import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReadSectionResponse } from '../../types/ReadSectionResponse';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(
    private http: HttpClient
  ) { }

  read(): Observable<ReadSectionResponse[]> {
    return this.http.get<ReadSectionResponse[]>(`${environment.basePath}/api/sections`);
  }
}

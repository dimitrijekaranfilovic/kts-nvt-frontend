import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthRequest } from "../../types/AuthRequest";
import { AuthResponse } from "../../types/AuthResponse";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(auth: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("backend/api/super-users/authenticate", auth);
  }
}
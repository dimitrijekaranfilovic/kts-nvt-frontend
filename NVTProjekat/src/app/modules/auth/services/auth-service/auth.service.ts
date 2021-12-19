import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthRequest } from "../../types/AuthRequest";
import { AuthResponse } from "../../types/AuthResponse";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  login(auth: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("http://localhost:8081/api/super-users/authenticate", auth, {
      headers: this.headers,
      responseType: "json",
    });
  }
}
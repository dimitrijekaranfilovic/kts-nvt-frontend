import { Injectable } from '@angular/core';
import { AuthResponse } from '../../types/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private userKey: string = "currentUser";

  setCurrentUser(user: AuthResponse) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
  
  hasUser(): boolean {
    return localStorage.getItem(this.userKey) !== null;
  }

  getCurrentUser(): AuthResponse | null {
    const user: string | null = localStorage.getItem(this.userKey);
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }
}

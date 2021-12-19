import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/modules/auth/services/currrent-user-service/current-user.service';
import { AuthResponse } from 'src/app/modules/auth/types/AuthResponse';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  loggedIn: boolean = false;
  isAdmin: boolean = false;
  isManager: boolean = false;
  currentUser: AuthResponse | null = null;

  constructor(
    private currentUserService: CurrentUserService
  ) {
    this.reloadCurrentUser();
  }

  ngOnInit(): void {
  }

  reloadCurrentUser(): void {
    this.currentUser = this.currentUserService.getCurrentUser();
    this.loggedIn = this.currentUserService.hasUser();
    this.isAdmin = this.currentUserService.hasAuthority('ADMIN');
    this.isManager = this.currentUserService.hasAuthority('MANAGER');
  }

}

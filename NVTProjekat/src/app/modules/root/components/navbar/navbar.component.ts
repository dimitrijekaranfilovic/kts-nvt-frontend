import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/modules/auth/services/currrent-user-service/current-user.service';
import { AuthResponse } from 'src/app/modules/auth/types/AuthResponse';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  loggedIn: boolean = false;
  @Input()
  isAdmin: boolean = false;
  @Input()
  isManager: boolean = false;
  @Input()
  user: AuthResponse | null = null;

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.currentUserService.removeCurrentUser();
    this.router.navigate(["/auth/login"]);
  }
}

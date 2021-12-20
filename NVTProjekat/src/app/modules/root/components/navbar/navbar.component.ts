import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/modules/auth/services/currrent-user-service/current-user.service';

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
  name: string | undefined = '';
  @Input()
  surname: string | undefined = '';

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

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/modules/auth/services/currrent-user-service/current-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private currentUserService: CurrentUserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.currentUserService.removeCurrentUser();
    this.snackBar.open("Logout successfull.", "Dismiss", { duration: 5000, verticalPosition: "top" });
    this.router.navigate(["/login"]);
  }
}

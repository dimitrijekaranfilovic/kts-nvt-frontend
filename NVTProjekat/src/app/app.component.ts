import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CurrentUserService } from './modules/auth/services/currrent-user-service/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NVTProjekat';

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  logout(): void {
    this.currentUserService.removeCurrentUser();
    this.snackBar.open("Logout successfull.", "Dismiss", { duration: 5000, verticalPosition: "top" });
    this.router.navigate([""]);
  }
}

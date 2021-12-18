import { Component } from '@angular/core';
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
    private router: Router
  ) { }

  logout(): void {
    this.currentUserService.removeCurrentUser();
    this.router.navigate([""]);
  }
}

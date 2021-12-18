import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { CurrentUserService } from '../../services/currrent-user-service/current-user.service';
import { AuthRequest } from '../../types/AuthRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Input() error!: string | null;
  form: FormGroup;

  invalidUser: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private currentUserService: CurrentUserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.invalidUser = false;
    const authRequest: AuthRequest = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.authService.login(authRequest).subscribe({
      next: response => {
        this.currentUserService.setCurrentUser(response);
        // TODO: Navigate to a page based on the user's role
        this.snackBar.open(`Welcome, ${response.name} ${response.surname}!`, "Dismiss", { duration: 5000, verticalPosition: "top" });
        const destination: string | null = this.route.snapshot.queryParamMap.get('to');
        if (destination) {
          this.router.navigate([destination]);
        } else {
          this.router.navigate([""]);
        }
      },
      error: _ => {
        this.invalidUser = true;
      }
    });
  }

}

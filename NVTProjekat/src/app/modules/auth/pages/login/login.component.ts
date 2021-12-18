import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
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
        alert("SUCCESSFULL LOGIN IN!!!");
        this.router.navigate([""]);
      },
      error: _ => {
        this.invalidUser = true;
      }
    });
  }

}
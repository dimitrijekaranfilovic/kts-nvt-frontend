import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/modules/auth/services/currrent-user-service/current-user.service';
import { AuthResponse } from 'src/app/modules/auth/types/AuthResponse';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { SuperUserService } from '../../services/super-user-servoce/super-user.service';

@Component({
  selector: 'app-update-profile-page',
  templateUrl: './update-profile-page.component.html',
  styleUrls: ['./update-profile-page.component.scss']
})
export class UpdateProfilePageComponent implements OnInit {
  form: FormGroup;
  user: AuthResponse | null;

  constructor(
    private currentUserService: CurrentUserService,
    private superUserService: SuperUserService,
    private errorService: ErrorService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.user = this.currentUserService.getCurrentUser();
    this.form = this.formBuilder.group({
      name: [this.user?.name, Validators.required],
      surname: [this.user?.surname, Validators.required],
      email: [this.user?.email, Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.form.valid || !this.user) {
      return;
    }
    //console.log(this.form.value);
    this.superUserService.update(this.user?.id, this.form.value).subscribe({
      next: _ => {
        this.currentUserService.update(this.form.value);
        this.router.navigate(["/employees"]);
      },
      error: err => this.errorService.handle(err)
    });
  }

  onCancel(): void {
    this.router.navigate(["/employees"]);
  }

}

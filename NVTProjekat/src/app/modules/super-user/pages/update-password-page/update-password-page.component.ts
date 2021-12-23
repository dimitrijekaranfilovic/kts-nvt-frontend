import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/modules/auth/services/currrent-user-service/current-user.service';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { mustMatchValidator } from 'src/app/modules/shared/validators/must-match.validator';
import { SuperUserService } from '../../services/super-user-servoce/super-user.service';

@Component({
  selector: 'app-update-password-page',
  templateUrl: './update-password-page.component.html',
  styleUrls: ['./update-password-page.component.scss']
})
export class UpdatePasswordPageComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private superUserService: SuperUserService,
    private currentUserService: CurrentUserService,
    private errorService: ErrorService
  ) {
    const newPasswordControl = new FormControl('', Validators.required);
    this.form = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: newPasswordControl,
      confirmPassword: ['', [Validators.required, mustMatchValidator(newPasswordControl)]]
    })
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.superUserService.updatePassword(this.currentUserService.getCurrentUser()?.id ?? -1, this.form.value).subscribe({
      next: _ => this.router.navigate(["/employees"]),
      error: err => this.errorService.handle(err)
    });
  }

  onCancel(): void {
    this.router.navigate(["/employees"]);
  }

}

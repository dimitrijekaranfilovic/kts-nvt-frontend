import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { mustMatchValidator } from 'src/app/modules/shared/validators/must-match.validator';
import { CreateSuperUserRequest } from '../../types/CreateSuperUserRequest';

@Component({
  selector: 'app-create-super-user-dialog',
  templateUrl: './create-super-user-dialog.component.html',
  styleUrls: ['./create-super-user-dialog.component.scss']
})
export class CreateSuperUserDialogComponent {
  form: FormGroup;
  onSaveChanges: EventEmitter<CreateSuperUserRequest> = new EventEmitter<CreateSuperUserRequest>();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateSuperUserDialogComponent>
  ) {
    const passwordControl = new FormControl('', Validators.required);
    const confirmPasswordControl = new FormControl('', Validators.compose([Validators.required, mustMatchValidator(passwordControl)]));
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: passwordControl,
      confirmPassword: confirmPasswordControl,
      salary: [0, Validators.compose([Validators.required, Validators.min(0)])],
      type: ['MANAGER', Validators.required]
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.onSaveChanges.emit(this.form.value);
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}



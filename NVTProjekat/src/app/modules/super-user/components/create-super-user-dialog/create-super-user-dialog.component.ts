import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { mustMatchValidator } from 'src/app/modules/shared/validators/must-match.validator';
import { CreateSuperUserRequest } from '../../types/CreateSuperUserRequest';

@Component({
  selector: 'app-create-super-user-dialog',
  templateUrl: './create-super-user-dialog.component.html',
  styleUrls: ['./create-super-user-dialog.component.scss']
})
export class CreateSuperUserDialogComponent implements OnInit {
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

  ngOnInit(): void {
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



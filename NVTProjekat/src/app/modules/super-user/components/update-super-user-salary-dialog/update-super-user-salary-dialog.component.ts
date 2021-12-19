import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadSuperUsersResponse } from '../../types/ReadSuperUsersResponse';

@Component({
  selector: 'app-update-super-user-salary-dialog',
  templateUrl: './update-super-user-salary-dialog.component.html',
  styleUrls: ['./update-super-user-salary-dialog.component.scss']
})
export class UpdateSuperUserSalaryDialogComponent implements OnInit {
  form: FormGroup;
  onSalaryUpdate: EventEmitter<number> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateSuperUserSalaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public superUser: ReadSuperUsersResponse
  ) {
    this.form = this.formBuilder.group({
      salary: [this.superUser.currentSalary, Validators.compose([Validators.required, Validators.min(0)])]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.onSalaryUpdate.emit(this.form.value.salary);
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

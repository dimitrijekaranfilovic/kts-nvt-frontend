import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateEmployeeRequest } from '../../types/CreateEmployeeRequest';
import { ReadEmployeeResponse } from '../../types/ReadEmployeeResponse';
import { UpdateEmployeeRequest } from '../../types/UpdateEmployeeRequest';

@Component({
  selector: 'app-create-update-employee-dialog',
  templateUrl: './create-update-employee-dialog.component.html',
  styleUrls: ['./create-update-employee-dialog.component.scss']
})
export class CreateUpdateEmployeeDialogComponent implements OnInit {
  form: FormGroup;
  isCreate: boolean;
  onSaveChanges: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateUpdateEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: ReadEmployeeResponse
  ) {
    this.isCreate = this.employee.id === 0;
    this.form = this.formBuilder.group({
      name: [employee.name, Validators.required],
      surname: [employee.surname, Validators.required],
      pin: [employee.pin, Validators.required],
      salary: [employee.currentSalary, Validators.compose([Validators.required, Validators.min(0)])],
      type: [employee.type, Validators.required]
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

import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadEmployeeResponse } from '../../types/ReadEmployeeResponse';

@Component({
  selector: 'app-update-employee-salary-dialog',
  templateUrl: './update-employee-salary-dialog.component.html',
  styleUrls: ['./update-employee-salary-dialog.component.scss']
})
export class UpdateEmployeeSalaryDialogComponent implements OnInit {
  form: FormGroup;
  onSalaryUpdate: EventEmitter<number> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateEmployeeSalaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: ReadEmployeeResponse
  ) {
    this.form = this.formBuilder.group({
      salary: [this.employee.currentSalary, Validators.compose([Validators.required, Validators.min(0)])]
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

}

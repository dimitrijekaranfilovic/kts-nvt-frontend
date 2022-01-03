import { Component, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { CreateTableRequest } from '../../types/CreateTableRequest';
import { CreateUpdateSectionDialogComponent } from '../create-update-section-dialog/create-update-section-dialog.component';

@Component({
  selector: 'app-create-table-dialog',
  templateUrl: './create-table-dialog.component.html',
  styleUrls: ['./create-table-dialog.component.scss']
})
export class CreateTableDialogComponent {

  @Output() saveChanges: EventEmitter<CreateTableRequest> = new EventEmitter();

  form!: FormGroup;
  isCreate: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateUpdateSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public table: CreateTableRequest
  ) {
    this.form = this.formBuilder.group({
      number: [table.number, [Validators.required, Validators.max(99), Validators.min(1)]],
      x: [table.x, [Validators.required, Validators.max(1200), Validators.min(0)]],
      y: [table.y, [Validators.required, Validators.max(720), Validators.min(0)]],
      r: [table.r]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.saveChanges.emit(this.form.value);
    this.dialogRef.close();
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface AddMenuItemToExistingGroupData {
  pin: string;
  amount: number;
}

@Component({
  selector: 'app-add-menu-item-to-existing-group-dialog',
  templateUrl: './add-menu-item-to-existing-group-dialog.component.html',
  styleUrls: ['./add-menu-item-to-existing-group-dialog.component.scss'],
})
export class AddMenuItemToExistingGroupDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddMenuItemToExistingGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddMenuItemToExistingGroupData
  ) {
    this.form = this.formBuilder.group({
      pin: [data.pin, [Validators.required, Validators.minLength(1)]],
      amount: [data.amount, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close({ event: 'CANCEL' });
  }
  onSubmit(event: Event): void {
    event.stopPropagation();
    if (!this.form.valid) {
      return;
    }
    this.dialogRef.close({
      pin: this.form.value.pin,
      amount: this.form.value.amount,
    });
  }
}

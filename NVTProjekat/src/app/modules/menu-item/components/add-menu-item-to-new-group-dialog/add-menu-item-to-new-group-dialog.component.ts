import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface AddMenuItemToNewGroupData {
  pin: string;
  amount: number;
  groupName: string;
}
@Component({
  selector: 'app-add-menu-item-to-new-group-dialog',
  templateUrl: './add-menu-item-to-new-group-dialog.component.html',
  styleUrls: ['./add-menu-item-to-new-group-dialog.component.scss'],
})
export class AddMenuItemToNewGroupDialogComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddMenuItemToNewGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddMenuItemToNewGroupData
  ) {
    this.form = this.formBuilder.group({
      pin: [data.pin, [Validators.required, Validators.minLength(1)]],
      amount: [data.amount, [Validators.required, Validators.min(1)]],
      groupName: [
        data.groupName,
        [Validators.required, Validators.minLength(1)],
      ],
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
      groupName: this.form.value.groupName,
    });
  }
}

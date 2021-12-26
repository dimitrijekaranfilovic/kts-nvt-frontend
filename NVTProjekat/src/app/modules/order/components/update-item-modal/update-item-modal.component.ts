import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface UpdateDialogData {
  pin: string;
  newAmount: number;
}

@Component({
  selector: 'app-update-item-modal',
  templateUrl: './update-item-modal.component.html',
  styleUrls: ['./update-item-modal.component.scss'],
})
export class UpdateItemModalComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateDialogData
  ) {
    this.form = this.formBuilder.group({
      pin: [data.pin, [Validators.required, Validators.minLength(1)]],
      newAmount: [data.newAmount, [Validators.required, Validators.min(1)]],
    });
  }

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
      newAmount: this.form.value.newAmount,
    });
  }
}

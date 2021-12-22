import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  pin: string;
}

@Component({
  selector: 'app-pin-modal',
  templateUrl: './pin-modal.component.html',
  styleUrls: ['./pin-modal.component.scss'],
})
export class PinModalComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PinModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = this.formBuilder.group({
      pin: [this.data.pin, [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {}

  onNoClick(pin: string, event: string): void {
    this.dialogRef.close({ pin, event });
  }
  onCancelClick(): void {
    this.dialogRef.close({ pin: this.data.pin, event: 'CANCEL' });
  }
  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.dialogRef.close(this.form.value.pin);
  }
}

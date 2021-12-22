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
      pin: [data.pin, [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {}

  onCancelClick(): void {
    console.log('CANCEL');
    this.dialogRef.close({ event: 'CANCEL' });
  }
  onSubmit(event: Event): void {
    event.stopPropagation();
    if (!this.form.valid) {
      return;
    }
    this.dialogRef.close(this.form.value.pin);
  }
}

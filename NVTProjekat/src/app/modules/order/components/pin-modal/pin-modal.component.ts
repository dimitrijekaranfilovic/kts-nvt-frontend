import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  pin: string
}

@Component({
  selector: 'app-pin-modal',
  templateUrl: './pin-modal.component.html',
  styleUrls: ['./pin-modal.component.scss']
})
export class PinModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PinModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
  }

  onNoClick(pin: string, event: string): void {
    this.dialogRef.close({pin, event});
  }

}

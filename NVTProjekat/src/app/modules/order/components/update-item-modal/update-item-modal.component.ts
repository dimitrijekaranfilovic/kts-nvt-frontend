import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UpdateDialogData {
  pin: string;
  newAmount: number;
}

@Component({
  selector: 'app-update-item-modal',
  templateUrl: './update-item-modal.component.html',
  styleUrls: ['./update-item-modal.component.scss'],
})
export class UpdateItemModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UpdateItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateDialogData
  ) {}

  ngOnInit(): void {}

  onNoClick(data: UpdateDialogData, event: string): void {
    this.dialogRef.close({ data, event });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(
    public dialogRef: MatDialogRef<AddMenuItemToExistingGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddMenuItemToExistingGroupData
  ) {}

  ngOnInit(): void {}

  onNoClick(data: AddMenuItemToExistingGroupData, event: string): void {
    this.dialogRef.close({ data, event });
  }
}

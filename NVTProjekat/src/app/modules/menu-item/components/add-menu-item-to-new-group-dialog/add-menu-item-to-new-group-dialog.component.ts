import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor(
    public dialogRef: MatDialogRef<AddMenuItemToNewGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddMenuItemToNewGroupData
  ) {}

  ngOnInit(): void {}

  onNoClick(data: AddMenuItemToNewGroupData, event: string): void {
    this.dialogRef.close({ data, event });
  }
}

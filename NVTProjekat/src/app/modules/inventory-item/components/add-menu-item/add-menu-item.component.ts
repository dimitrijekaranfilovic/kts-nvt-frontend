import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadInventoryItemResponse } from '../../types/ReadInventoryItemResponse';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.scss'],
})
export class AddMenuItemComponent {
  form: FormGroup;
  onPriceUpdate: EventEmitter<number> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddMenuItemComponent>,
    @Inject(MAT_DIALOG_DATA) public inventoryItem: ReadInventoryItemResponse
  ) {
    this.form = this.formBuilder.group({
      price: [
        this.inventoryItem.currentPrice,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.onPriceUpdate.emit(this.form.value.price);
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

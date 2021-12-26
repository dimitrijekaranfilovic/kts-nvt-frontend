import { Component, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadInventoryItemResponse } from '../../types/ReadInventoryItemResponse';

@Component({
  selector: 'app-create-update-inventory-item',
  templateUrl: './create-update-inventory-item.component.html',
  styleUrls: ['./create-update-inventory-item.component.scss'],
})
export class CreateUpdateInventoryItemComponent {
  form: FormGroup;
  isCreate: boolean;
  onSaveChanges: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateUpdateInventoryItemComponent>,
    @Inject(MAT_DIALOG_DATA) public inventoryItem: ReadInventoryItemResponse
  ) {
    this.isCreate = this.inventoryItem.id === 0;
    this.form = this.formBuilder.group({
      name: [inventoryItem.name, Validators.required],
      description: [inventoryItem.description],
      basePrice: [
        inventoryItem.currentPrice,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      allergies: [inventoryItem.allergies],
      category: [inventoryItem.category, Validators.required],
      image: [inventoryItem.image],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.onSaveChanges.emit(this.form.value);
    this.dialogRef.close();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

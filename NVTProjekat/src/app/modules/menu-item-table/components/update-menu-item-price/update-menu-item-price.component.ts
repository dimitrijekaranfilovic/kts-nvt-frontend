import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadMenuItemResponse } from '../../types/ReadMenuItemResponse';

@Component({
  selector: 'app-update-menu-item-price',
  templateUrl: './update-menu-item-price.component.html',
  styleUrls: ['./update-menu-item-price.component.scss'],
})
export class UpdateMenuItemPriceComponent {
  form: FormGroup;
  onPriceUpdate: EventEmitter<number> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateMenuItemPriceComponent>,
    @Inject(MAT_DIALOG_DATA) public menuItem: ReadMenuItemResponse
  ) {
    this.form = this.formBuilder.group({
      price: [
        this.menuItem.price,
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

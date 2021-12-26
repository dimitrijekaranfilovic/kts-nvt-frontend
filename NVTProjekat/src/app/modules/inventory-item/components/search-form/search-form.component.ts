import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReadInventoryItemRequest } from '../../types/ReadInventoryItemRequest';

@Component({
  selector: 'app-inventory-item-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  form: FormGroup;
  @Output()
  searchInventoryItem: EventEmitter<ReadInventoryItemRequest> = new EventEmitter<ReadInventoryItemRequest>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      query: [''],
      basePriceLowerBound: [
        0,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      basePriceUpperBound: [
        10000,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      category: [''],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.searchInventoryItem.emit(this.form.value);
  }

  onReset(): void {
    this.form.setValue({
      query: '',
      basePriceLowerBound: 0,
      basePriceUpperBound: 10000,
      category: '',
    });
    this.searchInventoryItem.emit(this.form.value);
  }
}

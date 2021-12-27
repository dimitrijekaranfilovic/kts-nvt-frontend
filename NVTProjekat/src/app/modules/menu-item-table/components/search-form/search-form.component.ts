import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReadMenuItemRequest } from '../../types/ReadMenuItemRequest';

@Component({
  selector: 'app-menu-item-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  form: FormGroup;
  @Output()
  searchMenuItem: EventEmitter<ReadMenuItemRequest> = new EventEmitter<ReadMenuItemRequest>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      query: [''],
      priceLowerBound: [
        0,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      priceUpperBound: [
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
    this.searchMenuItem.emit(this.form.value);
  }

  onReset(): void {
    this.form.setValue({
      query: '',
      priceLowerBound: 0,
      priceUpperBound: 10000,
      category: '',
    });
    this.searchMenuItem.emit(this.form.value);
  }
}

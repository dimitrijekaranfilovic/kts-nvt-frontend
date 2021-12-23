import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReadSuperusersRequest } from '../../types/ReadSuperUsersRequest';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  form: FormGroup;
  @Output()
  searchSuperUsers: EventEmitter<ReadSuperusersRequest> = new EventEmitter<ReadSuperusersRequest>();
  @Output()
  createSuperUser: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      query: [''],
      salaryLowerBound: [0, Validators.compose([Validators.required, Validators.min(0)])],
      salaryUpperBound: [10000, Validators.compose([Validators.required, Validators.min(0)])],
      type: ['']
    })
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.searchSuperUsers.emit(this.form.value);
  }

  onReset(): void {
    this.form.setValue({
      query: '',
      salaryLowerBound: 0,
      salaryUpperBound: 10000,
      type: ''
    });
    this.searchSuperUsers.emit(this.form.value);
  }

  onCreateClick(): void {
    this.createSuperUser.emit();
  }

}

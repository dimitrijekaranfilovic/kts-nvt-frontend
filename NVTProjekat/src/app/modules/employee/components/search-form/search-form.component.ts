import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReadEmployeesRequest } from '../../types/ReadEmployeesRequest';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  form: FormGroup;
  @Output()
  createEmployee: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  searchEmployee: EventEmitter<ReadEmployeesRequest> = new EventEmitter<ReadEmployeesRequest>();

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
    this.searchEmployee.emit(this.form.value);
  }

  onReset(): void {
    this.form.setValue({
      query: '',
      salaryLowerBound: 0,
      salaryUpperBound: 10000,
      type: ''
    });
    this.searchEmployee.emit(this.form.value);
  }

  onCreateEmployeeClick() {
    this.createEmployee.emit();
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReadEmployeesRequest } from '../../types/ReadEmployeesRequest';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  form: FormGroup;
  @Output()
  onCreateEmployee: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  onSearchEmployee: EventEmitter<ReadEmployeesRequest> = new EventEmitter<ReadEmployeesRequest>();

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

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.onSearchEmployee.emit(this.form.value);
  }

  onReset(): void {
    this.form.setValue({
      query: '',
      salaryLowerBound: 0,
      salaryUpperBound: 10000,
      type: ''
    });
    this.onSearchEmployee.emit(this.form.value);
  }

  onCreateEmployeeClick() {
    this.onCreateEmployee.emit();
  }

}

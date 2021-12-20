import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateSectionRequest } from '../../types/CreateSectionRequest';
import { ReadSectionResponse } from '../../types/ReadSectionResponse';

@Component({
  selector: 'app-create-update-section-dialog',
  templateUrl: './create-update-section-dialog.component.html',
  styleUrls: ['./create-update-section-dialog.component.scss']
})
export class CreateUpdateSectionDialogComponent implements OnInit {
  form: FormGroup;
  isCreate: boolean = true;
  onSaveChanges: EventEmitter<CreateSectionRequest> = new EventEmitter<CreateSectionRequest>();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateUpdateSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public section: ReadSectionResponse
  ) {
    this.isCreate = section.id !== 0;
    this.form = this.formBuilder.group({
      name: [section.name, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.onSaveChanges.emit(this.form.value);
    this.dialogRef.close();
  }

}

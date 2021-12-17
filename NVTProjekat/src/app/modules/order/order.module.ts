import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class OrderModule { }

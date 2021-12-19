import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  handle(error: HttpErrorResponse): void {
    this.snackBar.open(error.error.message, "Dissmiss", { duration: 5000, verticalPosition: "top" });
  }
}

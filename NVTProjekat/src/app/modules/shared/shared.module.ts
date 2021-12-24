import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { SuchEmptyComponent } from './components/such-empty/such-empty.component';


@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    SuchEmptyComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    SuchEmptyComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ]
})
export class SharedModule { }

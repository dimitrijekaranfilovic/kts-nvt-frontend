import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutes } from './auth.routes';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    MaterialModule
  ]
})
export class AuthModule { }

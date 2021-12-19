import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { RouterModule } from '@angular/router';
import { EmployeeRoutes } from './employee.routes';



@NgModule({
  declarations: [
    EmployeePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeRoutes)
  ]
})
export class EmployeeModule { }

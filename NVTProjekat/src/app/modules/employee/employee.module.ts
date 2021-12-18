import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { RouterModule } from '@angular/router';
import { EmployeeRoutes } from './employee.routes';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { MaterialModule } from 'src/app/material.module';
import { UpdateEmployeeSalaryDialogComponent } from './components/update-employee-salary-dialog/update-employee-salary-dialog.component';



@NgModule({
  declarations: [
    EmployeePageComponent,
    EmployeeTableComponent,
    UpdateEmployeeSalaryDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeRoutes),
    MaterialModule
  ]
})
export class EmployeeModule { }

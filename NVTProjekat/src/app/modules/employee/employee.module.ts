import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { RouterModule } from '@angular/router';
import { EmployeeRoutes } from './employee.routes';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { MaterialModule } from 'src/app/material.module';
import { UpdateEmployeeSalaryDialogComponent } from './components/update-employee-salary-dialog/update-employee-salary-dialog.component';
import { CreateUpdateEmployeeDialogComponent } from './components/create-update-employee-dialog/create-update-employee-dialog.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    EmployeePageComponent,
    EmployeeTableComponent,
    UpdateEmployeeSalaryDialogComponent,
    CreateUpdateEmployeeDialogComponent,
    SearchFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(EmployeeRoutes),
    MaterialModule,
    SharedModule
  ]
})
export class EmployeeModule { }

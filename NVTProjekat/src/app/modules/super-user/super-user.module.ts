import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SuperUserRoutes } from './super-user.routes';
import { MaterialModule } from 'src/app/material.module';
import { SuperUsersPageComponent } from './pages/super-users-page/super-users-page.component';
import { SuperUsersTableComponent } from './components/super-users-table/super-users-table.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { UpdateSuperUserSalaryDialogComponent } from './components/update-super-user-salary-dialog/update-super-user-salary-dialog.component';
import { CreateSuperUserDialogComponent } from './components/create-super-user-dialog/create-super-user-dialog.component';
import { UpdateProfilePageComponent } from './pages/update-profile-page/update-profile-page.component';



@NgModule({
  declarations: [
    SuperUsersPageComponent,
    SuperUsersTableComponent,
    SearchFormComponent,
    UpdateSuperUserSalaryDialogComponent,
    CreateSuperUserDialogComponent,
    UpdateProfilePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SuperUserRoutes),
    MaterialModule
  ]
})
export class SuperUserModule { }

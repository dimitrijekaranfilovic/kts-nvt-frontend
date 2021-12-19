import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SuperUserRoutes } from './super-user.routes';
import { MaterialModule } from 'src/app/material.module';
import { SuperUsersPageComponent } from './pages/super-users-page/super-users-page.component';
import { SuperUsersTableComponent } from './components/super-users-table/super-users-table.component';



@NgModule({
  declarations: [
    SuperUsersPageComponent,
    SuperUsersTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SuperUserRoutes),
    MaterialModule
  ]
})
export class SuperUserModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "auth",
        loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
      },
      {
        path: "employees",
        loadChildren: () => import("./modules/employee/employee.module").then(m => m.EmployeeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

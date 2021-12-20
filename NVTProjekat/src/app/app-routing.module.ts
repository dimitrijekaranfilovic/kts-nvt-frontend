import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BartenderPageComponent } from './modules/order/pages/bartender-page/bartender-page.component';
import { ChefPageComponent } from './modules/order/pages/chef-page/chef-page.component';
import { LayoutComponent } from './modules/root/components/layout/layout.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "auth",
        loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
      },
      {
        path: "employees",
        loadChildren: () => import("./modules/employee/employee.module").then(m => m.EmployeeModule)
      },
      {
        path: "super-users",
        loadChildren: () => import("./modules/super-user/super-user.module").then(m => m.SuperUserModule)
      },
      {
        path: "reports",
        loadChildren: () => import("./modules/report/report.module").then(m => m.ReportModule)
      },
      {
        path: "sections",
        loadChildren: () => import("./modules/section/section.module").then(m => m.SectionModule)
      },
      {
        path: "chef",
        component: ChefPageComponent,
        pathMatch: "full"
      },
      {
        path: "bartender",
        component: BartenderPageComponent,
        pathMatch: "full"
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

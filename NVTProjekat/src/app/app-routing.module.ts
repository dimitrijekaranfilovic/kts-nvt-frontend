import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/root/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./modules/employee/employee.module').then(
            (m) => m.EmployeeModule
          ),
      },
      {
        path: 'super-users',
        loadChildren: () =>
          import('./modules/super-user/super-user.module').then(
            (m) => m.SuperUserModule
          ),
      },
      {
        path: 'inventory-items',
        loadChildren: () =>
          import('./modules/inventory-item/inventory-item.module').then(
            (m) => m.InventoryItemModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./modules/report/report.module').then((m) => m.ReportModule),
      },
      {
        path: 'sections',
        loadChildren: () =>
          import('./modules/section/section.module').then(
            (m) => m.SectionModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./modules/order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'waiter',
        loadChildren: () =>
          import('./modules/waiter/waiter.module').then((m) => m.WaiterModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

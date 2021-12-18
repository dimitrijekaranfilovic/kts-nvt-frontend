import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { EmployeePageComponent } from "./pages/employee-page/employee-page.component";


export const EmployeeRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: EmployeePageComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'MANAGER'] }
    },
];

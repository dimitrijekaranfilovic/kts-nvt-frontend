import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { ReportPageComponent } from "./pages/report-page/report-page.component";

export const ReportRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: ReportPageComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'MANAGER'] }
    },
];

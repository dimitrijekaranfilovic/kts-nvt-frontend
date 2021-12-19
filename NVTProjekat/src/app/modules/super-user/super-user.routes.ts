import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { SuperUsersPageComponent } from "./pages/super-users-page/super-users-page.component";

export const SuperUserRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: SuperUsersPageComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
    },
];

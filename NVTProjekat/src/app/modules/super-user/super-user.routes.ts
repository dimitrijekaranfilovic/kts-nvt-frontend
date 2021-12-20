import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { SuperUsersPageComponent } from "./pages/super-users-page/super-users-page.component";
import { UpdatePasswordPageComponent } from "./pages/update-password-page/update-password-page.component";
import { UpdateProfilePageComponent } from "./pages/update-profile-page/update-profile-page.component";

export const SuperUserRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: SuperUsersPageComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
    },
    {
        path: "profile",
        pathMatch: "full",
        component: UpdateProfilePageComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'MANAGER'] }
    },
    {
        path: "password",
        pathMatch: "full",
        component: UpdatePasswordPageComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'MANAGER'] }
    }
];

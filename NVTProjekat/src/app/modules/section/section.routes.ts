import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { SectionsPageComponent } from "./pages/sections-page/sections-page.component";

export const SectionRoutes: Routes = [
    {
        path: "manage",
        pathMatch: "full",
        component: SectionsPageComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'MANAGER'] }
    },
];

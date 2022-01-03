import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { SectionPageComponent } from "./pages/section-page/section-page.component";
import { SectionsPageComponent } from "./pages/sections-page/sections-page.component";

export const SectionRoutes: Routes = [
    {
        path: "manage",
        component: SectionsPageComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'MANAGER'] },
    },
    {
        path: ":id/layout",
        component: SectionPageComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'MANAGER'] },
    }
];

import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { MenuItemTablePageComponent } from "./pages/menu-item-table-page/menu-item-table-page.component";


export const MenuItemTableRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: MenuItemTablePageComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'MANAGER'] }
    },
];

import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { InventoryItemPageComponent } from "./pages/inventory-item-page/inventory-item-page.component";

export const InventoryItemRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: InventoryItemPageComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'MANAGER'] }
    },
];
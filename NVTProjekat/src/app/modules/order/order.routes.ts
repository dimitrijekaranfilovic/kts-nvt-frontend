import { Routes } from "@angular/router";
import { BartenderPageComponent } from "./pages/bartender-page/bartender-page.component";
import { ChefPageComponent } from "./pages/chef-page/chef-page.component";
import { OrderPageComponent } from "./pages/order-page/order-page.component";

export const OrderRoutes: Routes = [
    {
        path: "bartender",
        pathMatch: "full",
        component: BartenderPageComponent
    },
    {
        path: "chef",
        pathMatch: "full",
        component: ChefPageComponent
    },
    {
        path: "order/:id",
        pathMatch: "full",
        component: OrderPageComponent
    },
];
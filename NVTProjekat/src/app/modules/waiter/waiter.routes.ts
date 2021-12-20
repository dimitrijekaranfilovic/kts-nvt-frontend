import { Routes } from "@angular/router";
import { WaiterPageComponent } from "./pages/waiter-page/waiter-page.component";

export const WaiterRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: WaiterPageComponent
    },
];
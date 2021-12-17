import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BartenderPageComponent } from './modules/order/pages/bartender-page/bartender-page.component';
import { ChefPageComponent } from './modules/order/pages/chef-page/chef-page.component';

const routes: Routes = [
  {
    path: "chef",
    component: ChefPageComponent,
    pathMatch: "full"
  },
  {
    path: "bartender",
    component: BartenderPageComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

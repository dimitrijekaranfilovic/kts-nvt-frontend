import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiterPageComponent } from './pages/waiter-page/waiter-page.component';
import { SectionTabsViewComponent } from './components/section-tabs-view/section-tabs-view.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { WaiterRoutes } from './waiter.routes';



@NgModule({
  declarations: [
    WaiterPageComponent,
    SectionTabsViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(WaiterRoutes)
  ]
})
export class WaiterModule { }

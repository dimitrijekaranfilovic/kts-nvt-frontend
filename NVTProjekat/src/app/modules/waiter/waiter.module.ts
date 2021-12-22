import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiterPageComponent } from './pages/waiter-page/waiter-page.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { WaiterRoutes } from './waiter.routes';
import { SectionTablesViewComponent } from './components/section-tables-view/section-tables-view.component';
import { KonvaModule } from "ng2-konva";
import { SectionTabsViewWaiterComponent } from './components/section-tabs-view-waiter/section-tabs-view-waiter.component';


@NgModule({
  declarations: [
    WaiterPageComponent,
    SectionTabsViewWaiterComponent,
    SectionTablesViewComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(WaiterRoutes),
    KonvaModule
  ],
  exports: [
    SectionTablesViewComponent
  ]
})
export class WaiterModule { }

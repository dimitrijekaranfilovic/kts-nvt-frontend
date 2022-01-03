import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectionRoutes } from './section.routes';
import { MaterialModule } from 'src/app/material.module';
import { SectionsPageComponent } from './pages/sections-page/sections-page.component';
import { SectionTabsViewComponent } from './components/section-tabs-view/section-tabs-view.component';
import { SectionTabComponent } from './components/section-tab/section-tab.component';
import { CreateUpdateSectionDialogComponent } from './components/create-update-section-dialog/create-update-section-dialog.component';
import { CreateTableDialogComponent } from './components/create-table-dialog/create-table-dialog.component';
import { SectionPageComponent } from './pages/section-page/section-page.component';
import { SharedModule } from '../shared/shared.module';
import { SectionTablesViewComponent } from './components/section-tables-view/section-tables-view.component';
import { SectionTabsViewWaiterComponent } from './components/section-tabs-view-waiter/section-tabs-view-waiter.component';
import { KonvaModule } from 'ng2-konva';


@NgModule({
  declarations: [
    SectionsPageComponent,
    SectionTabsViewComponent,
    SectionTabComponent,
    CreateUpdateSectionDialogComponent,
    CreateTableDialogComponent,
    SectionPageComponent,
    SectionTablesViewComponent,
    SectionTabsViewWaiterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SectionRoutes),
    MaterialModule,
    SharedModule,
    KonvaModule
  ],
  exports: [
    SectionTabsViewWaiterComponent
  ]
})
export class SectionModule { }

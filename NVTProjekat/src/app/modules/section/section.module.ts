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
import { WaiterModule } from '../waiter/waiter.module';
import { SectionPageComponent } from './pages/section-page/section-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SectionsPageComponent,
    SectionTabsViewComponent,
    SectionTabComponent,
    CreateUpdateSectionDialogComponent,
    CreateTableDialogComponent,
    SectionPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SectionRoutes),
    MaterialModule,
    WaiterModule,
    SharedModule
  ]
})
export class SectionModule { }

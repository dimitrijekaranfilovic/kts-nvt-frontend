import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectionRoutes } from './section.routes';
import { MaterialModule } from 'src/app/material.module';
import { SectionsPageComponent } from './pages/sections-page/sections-page.component';
import { SectionTabsViewComponent } from './components/section-tabs-view/section-tabs-view.component';
import { SectionTabComponent } from './components/section-tab/section-tab.component';
import { CreateUpdateSectionDialogComponent } from './components/create-update-section-dialog/create-update-section-dialog.component';



@NgModule({
  declarations: [
    SectionsPageComponent,
    SectionTabsViewComponent,
    SectionTabComponent,
    CreateUpdateSectionDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SectionRoutes),
    MaterialModule
  ]
})
export class SectionModule { }
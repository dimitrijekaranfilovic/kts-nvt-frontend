import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiterPageComponent } from './pages/waiter-page/waiter-page.component';
import { SectionTabsViewComponent } from './components/section-tabs-view/section-tabs-view.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    WaiterPageComponent,
    SectionTabsViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class WaiterModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiterPageComponent } from './pages/waiter-page/waiter-page.component';
import { RouterModule } from '@angular/router';
import { WaiterRoutes } from './waiter.routes';
import { SectionModule } from '../section/section.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    WaiterPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WaiterRoutes),
    SectionModule,
    MaterialModule
  ],
  exports: [],
})
export class WaiterModule { }

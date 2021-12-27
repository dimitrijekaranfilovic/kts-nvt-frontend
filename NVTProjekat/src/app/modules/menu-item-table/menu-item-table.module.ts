import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemTableComponent } from './components/menu-item-table/menu-item-table.component';
import { MenuItemTablePageComponent } from './pages/menu-item-table-page/menu-item-table-page.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { RouterModule } from '@angular/router';
import { MenuItemTableRoutes } from './menu-item-table.routes';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MenuItemTableComponent,
    MenuItemTablePageComponent,
    SearchFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MenuItemTableRoutes),
    MaterialModule,
    SharedModule,
  ],
})
export class MenuItemTableModule {}

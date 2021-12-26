import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemTableComponent } from './components/menu-item-table/menu-item-table.component';
import { MenuItemTablePageComponent } from './pages/menu-item-table-page/menu-item-table-page.component';
import { SearchFormComponent } from './components/search-form/search-form.component';



@NgModule({
  declarations: [
    MenuItemTableComponent,
    MenuItemTablePageComponent,
    SearchFormComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class MenuItemTableModule { }

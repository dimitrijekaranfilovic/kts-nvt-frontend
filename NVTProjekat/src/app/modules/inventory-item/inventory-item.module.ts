import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryItemPageComponent } from './pages/inventory-item-page/inventory-item-page.component';
import { InventoryItemTableComponent } from './components/inventory-item-table/inventory-item-table.component';
import { RouterModule } from '@angular/router';
import { InventoryItemRoutes } from './inventory-item.routes';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from '../shared/shared.module';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { CreateUpdateInventoryItemComponent } from './components/create-update-inventory-item/create-update-inventory-item.component';
import { AddMenuItemComponent } from './components/add-menu-item/add-menu-item.component';

@NgModule({
  declarations: [
    InventoryItemPageComponent,
    InventoryItemTableComponent,
    SearchFormComponent,
    CreateUpdateInventoryItemComponent,
    AddMenuItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(InventoryItemRoutes),
    MaterialModule,
    SharedModule,
  ],
})
export class InventoryItemModule {}

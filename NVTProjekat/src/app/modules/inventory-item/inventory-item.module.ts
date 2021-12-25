import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryItemPageComponent } from './pages/inventory-item-page/inventory-item-page.component';
import { InventoryItemTableComponent } from './components/inventory-item-table/inventory-item-table.component';
import { RouterModule } from '@angular/router';
import { InventoryItemRoutes } from './inventory-item.routes';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    InventoryItemPageComponent,
    InventoryItemTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(InventoryItemRoutes),
    MaterialModule,
    SharedModule
  ]
})
export class InventoryItemModule { }

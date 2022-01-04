import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemCardComponent } from './components/menu-item-card/menu-item-card.component';
import { WaiterMenuItemsDisplayComponent } from './components/waiter-menu-items-display/waiter-menu-items-display.component';
import { AddMenuItemToExistingGroupDialogComponent } from './components/add-menu-item-to-existing-group-dialog/add-menu-item-to-existing-group-dialog.component';
import { AddMenuItemToNewGroupDialogComponent } from './components/add-menu-item-to-new-group-dialog/add-menu-item-to-new-group-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    MenuItemCardComponent,
    WaiterMenuItemsDisplayComponent,
    AddMenuItemToExistingGroupDialogComponent,
    AddMenuItemToNewGroupDialogComponent,
  ],
  imports: [CommonModule, SharedModule, MaterialModule],
  exports: [WaiterMenuItemsDisplayComponent],
})
export class MenuItemModule {}

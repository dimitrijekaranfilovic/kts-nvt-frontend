import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemCardComponent } from './components/menu-item-card/menu-item-card.component';
import { MatCardModule } from '@angular/material/card';
import { WaiterMenuItemsDisplayComponent } from './components/waiter-menu-items-display/waiter-menu-items-display.component';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [MenuItemCardComponent, WaiterMenuItemsDisplayComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    MatGridListModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
  ],
  exports: [WaiterMenuItemsDisplayComponent],
})
export class MenuItemModule {}

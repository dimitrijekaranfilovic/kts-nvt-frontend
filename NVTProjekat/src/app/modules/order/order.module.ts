import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChefPageComponent } from './pages/chef-page/chef-page.component';
import { BartenderPageComponent } from './pages/bartender-page/bartender-page.component';
import { OrderItemTableViewComponent } from './components/order-item-table-view/order-item-table-view.component';
import { PinModalComponent } from './components/pin-modal/pin-modal.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { MenuItemModule } from '../menu-item/menu-item.module';
import { OrderItemGroupComponent } from './components/order-item-group/order-item-group.component';
import { OrderItemGroupsViewComponent } from './components/order-item-groups-view/order-item-groups-view.component';
import { MatIconModule } from '@angular/material/icon';
import { OrderGroupItemComponent } from './components/order-group-item/order-group-item.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ChefPageComponent,
    BartenderPageComponent,
    OrderItemTableViewComponent,
    PinModalComponent,
    OrderPageComponent,
    OrderItemGroupComponent,
    OrderItemGroupsViewComponent,
    OrderGroupItemComponent,
  ],
  imports: [
    CommonModule,
    MenuItemModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatGridListModule,
    MatTooltipModule,
  ],
})
export class OrderModule {}

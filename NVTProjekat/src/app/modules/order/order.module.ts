import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChefPageComponent } from './pages/chef-page/chef-page.component';
import { BartenderPageComponent } from './pages/bartender-page/bartender-page.component';
import { OrderItemTableViewComponent } from './components/order-item-table-view/order-item-table-view.component';
import { PinModalComponent } from './components/pin-modal/pin-modal.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { MenuItemModule } from '../menu-item/menu-item.module';
import { OrderItemGroupComponent } from './components/order-item-group/order-item-group.component';
import { OrderItemGroupsViewComponent } from './components/order-item-groups-view/order-item-groups-view.component';
import { OrderGroupItemComponent } from './components/order-group-item/order-group-item.component';
import { UpdateItemModalComponent } from './components/update-item-modal/update-item-modal.component';
import { RouterModule } from '@angular/router';
import { OrderRoutes } from './order.routes';
import { MaterialModule } from 'src/app/material.module';
import { OrderEndComponent } from './components/order-end/order-end.component';
import { SharedModule } from '../shared/shared.module';

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
    UpdateItemModalComponent,
    OrderEndComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MenuItemModule,
    MaterialModule,
    RouterModule.forChild(OrderRoutes),
  ],
})
export class OrderModule {}

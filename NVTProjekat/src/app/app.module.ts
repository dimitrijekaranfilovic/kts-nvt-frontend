import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChefPageComponent } from './modules/order/pages/chef-page/chef-page.component';
import { OrderItemTableViewComponent } from './modules/order/components/order-item-table-view/order-item-table-view.component';
import { BartenderPageComponent } from './modules/order/pages/bartender-page/bartender-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ChefPageComponent,
    BartenderPageComponent,
    OrderItemTableViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

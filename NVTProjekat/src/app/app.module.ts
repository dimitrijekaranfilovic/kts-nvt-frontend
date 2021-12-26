import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { OrderModule } from './modules/order/order.module';
import { RootModule } from './modules/root/root.module';
import { MaterialModule } from './material.module';
import { SuperUserModule } from './modules/super-user/super-user.module';
import { ReportModule } from './modules/report/report.module';
import { WaiterModule } from './modules/waiter/waiter.module';
import { MenuItemModule } from './modules/menu-item/menu-item.module';
import { InventoryItemModule } from './modules/inventory-item/inventory-item.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    EmployeeModule,
    SuperUserModule,
    ReportModule,
    AuthModule,
    SharedModule,
    OrderModule,
    RootModule,
    WaiterModule,
    MenuItemModule,
    InventoryItemModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

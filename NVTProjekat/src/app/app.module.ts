import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { OrderModule } from './modules/order/order.module';
import { RootModule } from './modules/root/root.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    EmployeeModule,
    AuthModule,
    SharedModule,
    OrderModule,
    RootModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

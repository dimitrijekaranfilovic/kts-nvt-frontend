import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
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

@NgModule({
  declarations: [
    ChefPageComponent,
    BartenderPageComponent,
    OrderItemTableViewComponent,
    PinModalComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class OrderModule { }

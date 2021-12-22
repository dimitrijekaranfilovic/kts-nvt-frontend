import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Section } from '../../types/Section';
import { WaiterSectionServiceService } from '../../services/waiter-section-service.service';
import { Table } from '../../types/Table';
import { TableOrder } from '../../types/TableOrder';
import { OrderService } from 'src/app/modules/order/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { PinModalComponent } from 'src/app/modules/order/components/pin-modal/pin-modal.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-section-tabs-view-waiter',
  templateUrl: './section-tabs-view-waiter.component.html',
  styleUrls: ['./section-tabs-view-waiter.component.scss'],
})
export class SectionTabsViewWaiterComponent implements OnInit {
  tables: Map<number, Table[]> = new Map<number, Table[]>();
  sections!: Section[];
  selected = new FormControl(0);
  counter: number = 1;
  pin: string = '';

  constructor(
    private sectionService: WaiterSectionServiceService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sectionService.getSections().subscribe((response) => {
      this.sections = response;
      this.sections.sort((s1, s2) => s1.id - s2.id);
    });
  }

  onTabSelect(event: any): void {
    if (event) {
      this.fetchTables(event.index + 1);
    } else {
      this.fetchTables(1);
    }
  }

  fetchTables(index: number): void {
    this.sectionService
      .getTablesForSection(index)
      .subscribe((response) => this.tables.set(index, response));
  }

  openDialog(tableOrder: TableOrder): void {
    if (tableOrder.tableAvailable) {
      const dialogRef = this.dialog.open(PinModalComponent, {
        width: '250px',
        data: { pin: this.pin },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result.event === 'CANCEL') {
          return;
        }
        this.orderService
          .createOrder(tableOrder.tableId, result)
          .subscribe((result) => {
            this.router.navigate([`/order/${result.id}`]);
          });
      });
    } else {
      this.orderService
        .getOrderIdForTable(tableOrder.tableId)
        .subscribe((result) => this.router.navigate([`/order/${result}`]));
    }
  }

  toast(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
      verticalPosition: 'bottom',
    });
  }
}

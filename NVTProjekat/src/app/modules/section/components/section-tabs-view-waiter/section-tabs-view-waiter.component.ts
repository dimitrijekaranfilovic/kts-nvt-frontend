import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Section } from '../../types/Section';
import { Table } from '../../types/Table';
import { OrderService } from 'src/app/modules/order/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { PinModalComponent } from 'src/app/modules/order/components/pin-modal/pin-modal.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SectionService } from '../../services/section-service/section.service';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
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
    private sectionService: SectionService,
    private orderService: OrderService,
    private errorService: ErrorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sectionService.read().subscribe((response) => {
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

  openDialog(table: Table): void {
    if (!table.available) {
      this.orderService
        .getOrderIdForTable(table.id)
        .subscribe((result) => this.router.navigate([`/order/${result}`]));
      return;
    }
    const dialogRef = this.dialog.open(PinModalComponent, {
      width: '250px',
      data: { pin: this.pin },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'CANCEL') {
        return;
      }
      this.orderService
        .createOrder(table.id, result)
        .subscribe({
          next: (response) => {
            this.router.navigate([`/order/${response.id}`]);
          },
          error: () => {
            this.errorService.show('You are not authorized to create an order.');
          }
        });
    });
  }
}

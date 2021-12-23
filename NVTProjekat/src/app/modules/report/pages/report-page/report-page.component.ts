import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets } from 'chart.js';
import * as moment from 'moment';
import { Label } from 'ng2-charts';
import { ReportService } from '../../services/report-service/report.service';
import { ReadReportsRequest } from '../../types/ReadReportsRequest';
import { ReadReportsResponse } from '../../types/ReadReportsResponse';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit {
  cumulativeData: ChartDataSets[] = [];
  cumulativeLabels: Label[] = ['Salary expenses', 'Order incomes', 'Order costs'];
  salaryExpensesData: ChartDataSets[] = [];
  orderIncomesData: ChartDataSets[] = [];
  orderCostsData: ChartDataSets[] = [];
  labels: Label[] = []

  form: FormGroup;
  reportData: ReadReportsResponse = { values: [], labels: [] }

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) {
    this.form = this.formBuilder.group({
      from: [new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), Validators.required],
      to: [new Date(), Validators.required]
    })
  }

  ngOnInit() {
    this.fetchData();
  }

  onDateRangeSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.fetchData();
  }

  fetchData(): void {
    const request: ReadReportsRequest = {
      from: moment(this.form.value.from).format('yyy-MM-DD'),
      to: moment(this.form.value.to).format('yyy-MM-DD')
    };
    this.reportService.readSalaryExpenses(request).subscribe(salaryResponse => {
      this.salaryExpensesData = [{ data: salaryResponse.values, label: 'Salary expenses' }];
      this.labels = salaryResponse.labels;
      const totalSalary = salaryResponse.values.reduce((x, y) => x + y, 0);
      this.reportService.readOrderIncomes(request).subscribe(incomeResponse => {
        this.orderIncomesData = [{ data: incomeResponse.values, label: 'Order incomes' }];
        const totalOrderIncomes = incomeResponse.values.reduce((x, y) => x + y, 0);
        this.reportService.readOrderCosts(request).subscribe(costResponse => {
          this.orderCostsData = [{ data: costResponse.values, label: 'Order costs' }];
          const totalOrderCosts = costResponse.values.reduce((x, y) => x + y, 0);
          this.cumulativeData = [{ data: [totalSalary, totalOrderIncomes, totalOrderCosts], label: 'Cumulative data' }];
        })
      })
    })
  }

}
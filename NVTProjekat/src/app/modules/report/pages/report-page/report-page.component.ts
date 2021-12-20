import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ReportService } from '../../services/report-service/report.service';
import { ReadReportsRequest } from '../../types/ReadReportsRequest';
import { ReadReportsResponse } from '../../types/ReadReportsResponse';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent {
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  lineChartOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  lineChartColors: Color[] = [
    {
      borderColor: '#3f51b5',
      backgroundColor: 'rgba(63, 81, 181, 0.3)',
    },
  ];
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];

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
      from: this.form.value.from.toISOString().slice(0, 10),
      to: this.form.value.to.toISOString().slice(0, 10)
    };
    this.reportService.readOrderIncomes(request).subscribe(response => {
      console.log(response);
      this.lineChartData = [{
        data: response.values,
        label: 'Salary expenses'
      }];
      this.lineChartLabels = response.labels;
    });
  }
}
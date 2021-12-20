import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReportRoutes } from './report.routes';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { MaterialModule } from 'src/app/material.module';
import { ChartsModule } from 'ng2-charts';
import { ReportChartComponent } from './components/report-chart/report-chart.component';

@NgModule({
  declarations: [ReportPageComponent, ReportChartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ReportRoutes),
    MaterialModule,
    ChartsModule,
  ],
})
export class ReportModule {}

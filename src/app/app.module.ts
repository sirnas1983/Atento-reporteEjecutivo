import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { RoundNumberPipe } from './pipes/RoundNumberPipe';
import { ExcelDateToDate } from './pipes/ExcelDateToDate';
import { CustomDatePipe } from './pipes/custom-date.pipe';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GraphComponent } from './components/executive/chart/graph.component';
import { ListComponent } from './components/executive/list/list.component';
import { ContainerComponent } from './components/executive/structure/container.component';
import { ExcelComponent } from './components/excel/excel.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DetailComponent } from './components/executive/detail/detail.component';




registerLocaleData(localeEs);


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GraphComponent,
    ListComponent,
    ContainerComponent,
    ExcelComponent,
    DetailComponent,
    LoadingComponent,

    RoundNumberPipe,
    ExcelDateToDate,
    CustomDatePipe,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    NgCircleProgressModule.forRoot({
      animationDuration: 300,
      maxPercent: 100,
      animation: true,
      units: "%",
      showTitle:true,
      innerStrokeWidth: 3,
      outerStrokeWidth: 6
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

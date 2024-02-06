import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GraphComponent } from './executive/chart/graph.component';
import { Card1Component } from './executive/list/card1.component';
import { ContainerComponent } from './executive/structure/container.component';
import { ExcelComponent } from './components/excel/excel.component';
import { RoundNumberPipe } from './pipes/RoundNumberPipe';
import { DetailComponent } from './executive/detail/detail.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { ExcelDateToDate } from './pipes/ExcelDateToDate';
import { LoadingComponent } from './components/loading/loading.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GraphComponent,
    Card1Component,
    ContainerComponent,
    ExcelComponent,
    RoundNumberPipe,
    ExcelDateToDate,
    DetailComponent,
    LoadingComponent,
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

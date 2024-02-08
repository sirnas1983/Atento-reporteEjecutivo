import { NgModule} from '@angular/core'
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { RoundNumberPipe } from './pipes/RoundNumberPipe';
import { ExcelDateToDate } from './pipes/ExcelDateToDate';
import { CustomDatePipe } from './pipes/custom-date.pipe';


import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GraphComponent } from './components/executive/chart/graph.component';
import { ListComponent } from './components/executive/list/list.component';
import { ContainerComponent } from './components/executive/structure/container.component';
import { ExcelComponent } from './components/excel/excel.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DetailComponent } from './components/executive/detail/detail.component';
import { ImproductividadTableComponent } from './components/improductividad/improductividad-table/improductividad-table.component';
import { ImproductividadStructureComponent } from './components/improductividad/improductividad-structure/improductividad-structure.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { TardanzasStructureComponent } from './components/tardanzas/tardanzas-structure/tardanzas-structure.component';
import { TardanzasTableComponent } from './components/tardanzas/tardanzas-table/tardanzas-table.component';
import { OperativoStructureComponent } from './components/tiempoOperativo/operativo-structure/operativo-structure.component';
import { OperativoTableComponent } from './components/tiempoOperativo/operativo-table/operativo-table.component';




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
    ImproductividadTableComponent,
    ImproductividadStructureComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    TardanzasStructureComponent,
    TardanzasTableComponent,
    OperativoStructureComponent,
    OperativoTableComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
  ],
  providers: [], // You can add services here if needed at the application level
  bootstrap: [AppComponent]
})
export class AppModule { }

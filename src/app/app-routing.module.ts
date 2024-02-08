import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/executive/structure/container.component';
import { ImproductividadStructureComponent } from './components/improductividad/improductividad-structure/improductividad-structure.component';
import { ListComponent } from './components/executive/list/list.component';
import { TardanzasStructureComponent } from './components/tardanzas/tardanzas-structure/tardanzas-structure.component';
import { OperativoStructureComponent } from './components/tiempoOperativo/operativo-structure/operativo-structure.component';
import { GraphComponent } from './components/executive/chart/graph.component';

const routes: Routes = [
  { path: 'general', component: ContainerComponent },
  { path: 'improductivos', component: ImproductividadStructureComponent },
  { path: 'tardanzas', component: TardanzasStructureComponent },

  {
    path: 'personas',
    component: ListComponent,
  },
  {
    path: 'patagonia',
    component: OperativoStructureComponent
  },
  {
    path: 'grafica',
    component: GraphComponent
  },
  { path: '', redirectTo: '/general', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

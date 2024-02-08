import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './components/executive/structure/container.component';
import { TmoStructureComponent } from './components/tmo/tmo-structure/tmo-structure.component';

const routes: Routes = [
  { path: 'general', component: ContainerComponent },
  { path: 'improductivos', component: TmoStructureComponent },
  // Add more routes as needed
  { path: '', redirectTo: '/general', pathMatch: 'full' }, // Redirect to default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

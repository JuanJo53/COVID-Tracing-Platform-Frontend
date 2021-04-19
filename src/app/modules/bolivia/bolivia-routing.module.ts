import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDatasetsComponent } from '../home/pages/client-datasets/client-datasets.component';
import { BoliviaPageComponent } from './components/bolivia-page/bolivia-page.component';

const routes: Routes = [
  {
    path: '',
    component: BoliviaPageComponent,
  },
  {
    path: 'datasets',
    component: ClientDatasetsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoliviaRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientDatasetsComponent } from './pages/client-datasets/client-datasets.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
export class HomeRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatasetsComponent } from './pages/datasets/datasets.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminComponent,
  },
  {
    path: 'datasets',
    component: DatasetsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

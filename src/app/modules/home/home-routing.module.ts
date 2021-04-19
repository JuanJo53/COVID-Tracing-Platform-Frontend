import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InfvaccinationComponent } from './pages/infvaccination/infvaccination.component';
import { RecommendationsComponent } from './pages/recommendations/recommendations.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'recomendaciones',
    component: RecommendationsComponent,
  },
  {
    path: 'infovacs',
    component: InfvaccinationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

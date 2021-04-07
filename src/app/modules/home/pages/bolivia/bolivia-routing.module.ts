import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoliviaPageComponent } from './components/bolivia-page/bolivia-page.component';

const routes: Routes = [
  {
    path: '',
    component: BoliviaPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoliviaRoutingModule {}

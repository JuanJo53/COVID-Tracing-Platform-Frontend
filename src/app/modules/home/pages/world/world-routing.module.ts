import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldPageComponent } from './components/world-page/world-page.component';

const routes: Routes = [
  {
    path: '',
    component: WorldPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorldRoutingModule {}

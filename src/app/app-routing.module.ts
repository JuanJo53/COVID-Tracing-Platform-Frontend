import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { HomeComponent } from './modules/home/pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'inicio',
        component: HomeComponent,
      },
      {
        path: 'noticias',
        component: HomeComponent,
      },
      {
        path: 'bolivia',
        component: HomeComponent,
      },
      {
        path: 'mundo',
        component: HomeComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/inicio',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

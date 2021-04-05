import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      // {
      //   path: 'noticias',
      //   component: HomeComponent,
      // },
      // {
      //   path: 'bolivia',
      //   component: HomeComponent,
      // },
      // {
      //   path: 'mundo',
      //   component: HomeComponent,
      // },
    ],
  },
  {
    path: '**',
    redirectTo: '/inicio',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

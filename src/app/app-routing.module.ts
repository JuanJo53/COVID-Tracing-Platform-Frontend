import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { AdminGuard } from './core/guards/admin.guard';
import { WorldModule } from './modules/world/world.module';

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
        path: 'admin',
        canActivate: [AdminGuard],
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule),
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
      {
        path: 'bolivia',
        loadChildren: () =>
          import('./modules/bolivia/bolivia.module').then(
            (m) => m.BoliviaModule
          ),
      },
      {
        path: 'mundo',
        loadChildren: () =>
          import('./modules/world/world.module').then((m) => m.WorldModule),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
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

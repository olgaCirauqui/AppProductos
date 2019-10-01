import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthTabsPage } from './auth-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: AuthTabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'productos',
        children: [
          {
            path: '',
            loadChildren: '../productos/productos.module#ProductosPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/auth-tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
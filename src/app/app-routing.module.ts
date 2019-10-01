import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'auth-tabs',
    loadChildren: './pages/auth-tabs/auth-tabs.module#AuthTabsPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'producto-add', loadChildren: './pages/producto-add/producto-add.module#ProductoAddPageModule',
  canActivate: [AuthGuard] },
  { path: 'producto-edit', loadChildren: './pages/producto-edit/producto-edit.module#ProductoEditPageModule',
  canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
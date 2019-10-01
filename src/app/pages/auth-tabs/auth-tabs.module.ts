import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthTabsPage } from './auth-tabs.page';
import { TabsPageRoutingModule } from './auth-tabs.routing.module';

const routes: Routes = [
  {
    path: '',
    component: AuthTabsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TabsPageRoutingModule
  ],
  declarations: [AuthTabsPage]
})
export class AuthTabsPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './components/layouts/full/full.component';
import { BlankComponent } from './components/layouts/blank/blank.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: 'user/dashboard', pathMatch: 'full' },
      {
        path: 'admin',
        loadChildren: './components/admin/admin.module#AdminModule'
      },
      {
        path: 'user',
        loadChildren: './components/user/user.module#UserModule'
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren:
          './components/authentication/authentication.module#AuthenticationModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

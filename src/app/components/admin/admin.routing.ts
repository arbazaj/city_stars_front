import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';


export const AdminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard ',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Dashboard' }
          ]
        }
      }
    ]
  }
];

import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from '../shared/blog/blog.component';


export const UserRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard ',
          urls: [
            { title: 'Dashboard', url: 'user/dashboard' },
          ]
        }
      },
      {
        path: 'blog',
        component: BlogComponent,
        data: {
          title: 'Blog ',
          urls: [
            { title: 'Blog', url: 'user/blog' },
          ]
        }
      }
    ]
  }
];

import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from '../shared/blog/blog.component';
import { AuthGuardService } from '../../guards/auth-guard.service';

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
        canActivate: [AuthGuardService],
        data: {
          role: ['user'],
          title: 'Blogs',
          urls: [
            { title: 'Blogs', url: 'user/blog' },
          ]
        }
      }
    ]
  }
];

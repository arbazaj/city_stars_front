import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from '../shared/blog/blog.component';
import { AuthGuardService } from '../../guards/auth-guard.service';
import { BlogListComponent } from '../shared/blog-list/blog-list.component';
import { ViewBlogComponent } from '../shared/view-blog/view-blog.component';
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
        component: BlogListComponent,
        data: {
          role: ['user'],
          title: 'Blogs',
          urls: [
            { title: 'Blogs', url: 'user/blog' },
          ]
        }
      },
      {
        path: 'blog/:blogId',
        component: ViewBlogComponent,
        data: {
          role: ['user'],
          title: 'Blog',
          urls: [
            { title: 'Blog', url: 'user/blog/:blogId' },
          ]
        }
      }
      // {
      //   path: 'blog',
      //   component: BlogComponent,
      //   canActivate: [AuthGuardService],
      //   data: {
      //     role: ['user'],
      //     title: 'Blogs',
      //     urls: [
      //       { title: 'Blogs', url: 'user/blog' },
      //     ]
      //   }
      // }
    ]
  }
];

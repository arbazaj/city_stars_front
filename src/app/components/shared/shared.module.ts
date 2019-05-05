import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlogComponent} from './blog/blog.component';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';
import { BlogListComponent } from './blog-list/blog-list.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';

@NgModule({
  imports: [
    CommonModule,
    QuillModule,
    ToastrModule.forRoot()

  ],
  declarations: [BlogComponent, BlogListComponent, ViewBlogComponent],
  exports: [BlogComponent,BlogListComponent, ViewBlogComponent ]
})
export class SharedModule { }

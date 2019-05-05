import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlogComponent} from './blog/blog.component';
import { QuillModule } from 'ngx-quill';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    QuillModule,
    ToastrModule.forRoot()

  ],
  declarations: [BlogComponent],
  exports: [BlogComponent]
})
export class SharedModule { }

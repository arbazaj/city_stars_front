import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlogComponent} from './blog/blog.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    QuillModule
  ],
  declarations: [BlogComponent],
  exports: [BlogComponent]
})
export class SharedModule { }

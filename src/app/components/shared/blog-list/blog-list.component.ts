import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { CodeConstants } from '../../../code_constants';
import { SpinnerService } from '../../../services/spinner.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogList: any = [];
  constructor(private blogService: BlogService, private toasterService: ToastrService, private spinner: SpinnerService, private router:Router) { }

  ngOnInit() {
    this.spinner.show();
    this.blogService.getApprovedBlogList().subscribe((res: any) => {
      this.spinner.hide();
      if (res.data.blogs) {
        this.blogList = res.data.blogs;
      }
    }, err => {
      this.spinner.hide();
      if (err && err.error && err.error.errorType === CodeConstants.CUSTOM && err.error.message) {
        this.toasterService.error(err.error.message);
      } else {
        this.toasterService.error(CodeConstants.MSGS.ERROR_MSG);
      }
    })
  }

  readBlog(blog:any){
    this.router.navigate(['/user/blog', blog._id])
  }

}

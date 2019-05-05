import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { BlogService } from '../../../services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { CodeConstants } from '../../../code_constants';
import { SpinnerService } from '../../../services/spinner.service';
@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {
  blogDetails: any = {};
  constructor(private router: Router, private route: ActivatedRoute, private blogService: BlogService,
    private toasterService: ToastrService, private spinner: SpinnerService) { }

  ngOnInit() {
		this.route.queryParams.subscribe(params => {
      const blogId: string = params["blogId"] || '';
       this.getBlogDetails(blogId);
    });
    
  }

  getBlogDetails(blogId: string) {

    if (blogId) {
      this.spinner.show();
      this.blogService.getBlogDetails(blogId).subscribe((res: any) => {
        this.spinner.hide();
        this.blogDetails = res.data.blog;
      }, err => {
        this.spinner.hide();
        if (err && err.error && err.error.errorType === CodeConstants.CUSTOM && err.error.message) {
          this.toasterService.error(err.error.message);
        } else {
          this.toasterService.error(CodeConstants.MSGS.ERROR_MSG);
        }
      });
    }
    // return;
  }

}

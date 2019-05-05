import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SpinnerService } from '../../../services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { CodeConstants } from '../../../code_constants';
import { BlogService } from '../../../services/blog.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  valueBind: any;
  quillEditorRef: any;
  showLoader = false;
  blog: string = '';
  heading: string = '';
  blogLink: string = '';
  showHeadingMsg: boolean = false;
  showBlogMsg: boolean = false;
  constructor(private userService: UserService, 
    private spinner: SpinnerService,
    private toasterService: ToastrService,
    private blogService: BlogService) { }

  ngOnInit() {
  }

  submit() {
    if(this.heading && this.blog) {
      this.spinner.show();
      this.blogService.saveBlog({blogHtml: this.blog, heading: this.heading}).subscribe((result:any) => {
        if(result.data) {
          this.blogLink = environment.appUrl+'/user/blog/'+result.data._id;
        }
        this.toasterService.success('Successfull');
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        if (err && err.error && err.error.errorType === CodeConstants.CUSTOM && err.error.message) {
          this.toasterService.error(err.error.message);
        } else {
          this.toasterService.error(CodeConstants.MSGS.ERROR_MSG);
        }
      });
    } else {
      if(!this.heading) {
        this.showHeadingMsg = true;
      }
      if(!this.blog) {
        this.showBlogMsg = true;
      }
    }
  }

  editorContentChanged(event: any) {
    this.blog = event.html;
    if(event.html) {
      this.showBlogMsg = false;
    }
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler);
  }

  imageHandler = (image: any, callback: any) => {
    const input: any = <HTMLInputElement>document.getElementById('fileInputField');
    const inpElem: any = document.getElementById('fileInputField');
    inpElem.value = '';
    inpElem.onchange = () => {
      let file: File;
      file = input.files[0];
      if (/^image\//.test(file.type)) {
        if (file.size > CodeConstants.maxImageSize) {
          this.toasterService.error(CodeConstants.MSGS.IMAGE_SIZE_ERR);
        } else {
          const range = this.quillEditorRef.getSelection();
          this.showLoader = true
          this.userService.uploadBlogImage(file).subscribe((res: any) => {
            this.showLoader = false;
            const url = res.data.imageUrl;
            const img = '<img src="' + url + '" />';
            this.quillEditorRef.clipboard.dangerouslyPasteHTML(range.index, img);
          }, err => {
            this.showLoader = false;
            if (err && err.error && err.error.errorType === CodeConstants.CUSTOM && err.error.message) {
              this.toasterService.error(err.error.message);
            } else {
              this.toasterService.error(CodeConstants.MSGS.ERROR_MSG);
            }
          });
        }
      } else {
        this.toasterService.error(CodeConstants.MSGS.ONLY_IMAGE_UPLOAD);
      }
    };

    input.click();
  }

  onHeadingChange(event: any) {
    if(event.target.value) {
      this.showHeadingMsg = false;
    } else {
      this.showHeadingMsg = true;
    }
    this.heading = event.target.value;
  }
}

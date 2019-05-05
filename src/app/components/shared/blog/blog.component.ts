import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { SpinnerService } from '../../../services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { CodeConstants } from '../../../code_constants';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  valueBind: any;
  quillEditorRef: any;
  showLoader = false;
  constructor(private userService: UserService, private spinner: SpinnerService,
    private toasterService: ToastrService) { }

  ngOnInit() {
  }

  submit() {
    console.log("value", this.quillEditorRef)
  }

  editorContentChanged(event: any) {
    // console.log("content changed", event, event.html)
  }

  getEditorInstance(editorInstance: any) {
    this.quillEditorRef = editorInstance;
    console.log(this.quillEditorRef)
    const toolbar = editorInstance.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler);
  }

  imageHandler = (image: any, callback: any) => {
    const input: any = <HTMLInputElement>document.getElementById('fileInputField');
    const inpElem: any = document.getElementById('fileInputField');
    inpElem.onchange = () => {
      let file: File;
      file = input.files[0];
      // file type is only image.
      if (/^image\//.test(file.type)) {
        if (file.size > CodeConstants.maxImageSize) {
          this.toasterService.error(CodeConstants.MSGS.IMAGE_SIZE_ERR);
        } else {
          const range = this.quillEditorRef.getSelection();
          // const reader = new FileReader();
          // var date = new Date().getTime().toString();

          // reader.onload = () => {
          //   const img = '<img src="' + reader.result + '" class="'+date+'" />';
          //   this.quillEditorRef.clipboard.dangerouslyPasteHTML(range.index, img);
          // };
          // reader.readAsDataURL(file);
          this.showLoader = true
          this.userService.uploadBlogImage(file).subscribe((res: any) => {
            this.showLoader = false;
            const url = res.data.imageUrl;
            // const image: any = document.getElementsByClassName(date);
            // console.log("image", image, date, this.quillEditorRef)
            // image[0].src = url;
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

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  valueBind:any;
  constructor() { }

  ngOnInit() {
  }

  submit(){
    console.log("value", this.valueBind)
  }

  editorContentChanged(event:any){
    console.log("content changed",event, event.html)
  }
}

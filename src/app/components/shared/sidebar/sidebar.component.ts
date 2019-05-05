import { Component, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CodeConstants } from '../../../code_constants';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  userImage = '';
  name = '';
  userInfo: any = '';
  public sidebarnavItems: any= [];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // End open close
  email: string = '';
  ngOnInit() {
    this.userInfo = localStorage.getItem('userInfo') || "";
    if(this.userInfo) {
      this.userInfo = JSON.parse(this.userInfo);
    }
    if(this.userInfo && this.userInfo.token_key) { 
        this.userImage = this.userInfo.imageUrl;
        this.email = this.userInfo.email;
        this.name = this.userInfo.name;
    }
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
  }

  logout() {
    let role = this.userInfo.role;
    let url = '';
    localStorage.clear();
    this.userImage = this.email = this.userInfo = this.name = "";
    if(role && role == CodeConstants.Roles['ADMIN']) {
      url = '/login';
      this.router.navigateByUrl(url);
    } else {
      if(role) {
        url = role+'/dashboard';
        this.router.navigateByUrl(url);
      }
    }
  }
}

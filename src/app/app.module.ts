import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  Location,
  CommonModule,
  LocationStrategy,
  HashLocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { FullComponent } from './components/layouts/full/full.component';
import { BlankComponent } from './components/layouts/blank/blank.component';

import { NavigationComponent } from './components/shared/header-navigation/navigation.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './components/shared/breadcrumb/breadcrumb.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    RouterModule.forRoot(Approutes),
    PerfectScrollbarModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBUb3jDWJQ28vDJhuQZxkC0NXr_zycm8D0' })
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

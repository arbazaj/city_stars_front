import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from './services/spinner.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  	private sub: any;

  	constructor(private slimLoader: SlimLoadingBarService, 
                private router: Router,
                private spinner: NgxSpinnerService, 
                private spinnerService: SpinnerService
                ) {
        // Listen the navigation events to start or complete the slim bar loading
        this.sub = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.slimLoader.start();
            } else if ( event instanceof NavigationEnd ||
                        event instanceof NavigationCancel ||
                        event instanceof NavigationError) {
                this.slimLoader.complete();
            }
        }, (error: any) => {
            this.slimLoader.complete();
        });

        this.spinnerService.change.subscribe((showSpinner: boolean) => {
            if(showSpinner) {
                this.showSpinner();
            } else {
                this.hideSpinner();
            }
        });
    }

    showSpinner() {
        this.spinner.show();
    }

    hideSpinner() {
        this.spinner.hide();
    }
    ngOnDestroy(): any {
        this.sub.unsubscribe();
    }
}

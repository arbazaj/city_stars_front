import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SpinnerService } from '../services/spinner.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public router: Router,
                private spinner: SpinnerService
                ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log();
        return next.handle(request).pipe(catchError(err => {

            if (err.status == 401 || err.status == 403) {
                // auto logout if 401 response returned from api
                localStorage.removeItem('userInfo');
                this.spinner.hide();
                this.router.navigateByUrl('/login?continue='+this.router.url);
            }
            const error = err.error || err.statusText;
            return throwError(error);
        }))
    }
}
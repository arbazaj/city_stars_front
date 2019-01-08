import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    // add authorization header with jwt token if available
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let userInfo: any = ''; 
        userInfo = localStorage.getItem('userInfo') || {};
        let currentUser = JSON.parse(userInfo);
        if (currentUser && currentUser.token_key) {
            const token = currentUser.token_key;
            request = request.clone({
                setHeaders: {
                    'Authorization': 'Bearer '+token,
                    'Content-Type': 'application/json'
                }
            });
        } else {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return next.handle(request);
    }
}
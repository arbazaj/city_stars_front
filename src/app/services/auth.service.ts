import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class AuthService  {
    constructor(private http: HttpClient) { }

    loginFb() {
        return this.http.get(environment.baseUrl+'/login/facebook/');
    }

    loginGoogle() {
        return this.http.get(environment.baseUrl+'/login/google/');
    }
}
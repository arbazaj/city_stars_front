import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders }    from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class UserService  {
    constructor(private http: HttpClient) { }

    getUserByToken(token: string) {
    	let headers = new HttpHeaders().set('Content-Type', 'application/json');
		headers = headers.set('Authorization', 'Bearer ' + token);
    	return this.http.get(environment.baseUrl+'/user/getUser',{headers});
    }

    createUser(user: any) {
        return this.http.post(environment.baseUrl+'/user/createUser', user);
    }

    authUser(user: any) {
        return this.http.post(environment.baseUrl+'/user/authUser', user);
    }
    
}
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
      providedIn: 'root'
})

export class AuthGuardService implements CanActivate  {

  	constructor(private router: Router) { }

  	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        var userInfo: any = localStorage.getItem('userInfo') || ''
        if(userInfo) 
            userInfo = JSON.parse(userInfo);
    	if(userInfo && userInfo.token_key) {
    		if(next.data.role.includes(userInfo.role)) {
    			return true;
    		} else {
    			this.router.navigateByUrl(userInfo.role.toLowerCase()+"/dashboard");
    			return false;
    		}
    	}
    	this.router.navigate(['/login'], {
        	queryParams: {
          		continue: state.url
        	}
    	});
        return false;
    }
}

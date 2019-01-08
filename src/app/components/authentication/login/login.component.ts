import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
selector: 'app-login',
templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			let token = params['token'];
			if(token!=null) {
				this.router.navigateByUrl('user/dashboard');
			}
            
        });
	}
	loginform = true;
	recoverform = false;

	showRecoverForm() {
		this.loginform = !this.loginform;
		this.recoverform = !this.recoverform;
	}

}

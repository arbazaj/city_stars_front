import { Component } from '@angular/core';
import { AuthService } from "../../../services/auth.service";

@Component({
selector: 'app-login',
templateUrl: './login.component.html'
})
export class LoginComponent {
	constructor(
		private authService: AuthService
	) {}

	loginform = true;
	recoverform = false;

	showRecoverForm() {
		this.loginform = !this.loginform;
		this.recoverform = !this.recoverform;
	}

	loginFb() {
		this.authService.loginFb().subscribe((result: any) => {
			console.log(result);
		});
	}

	loginGoogle() {
		this.authService.loginGoogle().subscribe((result: any) => {
			console.log(result);
		});
	}
}

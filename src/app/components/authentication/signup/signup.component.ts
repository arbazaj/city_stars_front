import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent {
	public baseUrl = environment.baseUrl;
	constructor() {}

}

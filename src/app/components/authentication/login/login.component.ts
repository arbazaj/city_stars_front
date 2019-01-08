import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from '../../../../environments/environment';
import { SpinnerService } from '../../../services/spinner.service'

@Component({
selector: 'app-login',
templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
	baseUrl = environment.baseUrl;
	loginform = true;
	recoverform = false;
	loginuser:any = {
        email:'',
        password:''
    }
	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router,
		private spinner: SpinnerService
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			let token = params['token'];
			this.spinner.show();
			if(token!=null) {
				this.router.navigateByUrl('user/dashboard');
			}
			this.spinner.hide();
            
        });
	}


    onSubmit(){
    // this.spinner.show();
    // this.userService.loginUser(this.loginuser).subscribe(response=>{
    //     this.userInfo = {
    //         token_key: response['data'].token,
    //         role: response['data']['user']['role'],
    //         email: response['data']['user']['email'],
    //         class_name: response['data']['user']['class_name'],
    //         first_name: response['data']['user']['first_name'],
    //         last_name: response['data']['user']['last_name'],
    //         user_id: response['data']['user']['user_id'],
    //     }
    //     localStorage.setItem("userInfo",JSON.stringify(this.userInfo));
    //     this.spinner.hide();
    //     this.toasterService.success(this.message,' ',{
    //         timeOut: 10000
    //      });
    //     this.router.navigateByUrl(this.returnUrl);
    // },
    // err=>{
    //     this.spinner.hide();
    //     this.toasterService.error(err,' ',{
    //         timeOut: 10000
    //     });
    // });
    }

	showRecoverForm() {
		this.loginform = !this.loginform;
		this.recoverform = !this.recoverform;
	}

}

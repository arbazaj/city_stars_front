import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from '../../../../environments/environment';
import { SpinnerService } from '../../../services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { CodeConstants } from '../../../code_constants';

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
    public userInfo: any = {};
	constructor(
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router,
		private spinner: SpinnerService,
		private toasterService:ToastrService,
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			let token = params['token'];
			if(token!=null) {
				this.spinner.show();
				this.userService.getUserByToken(token).subscribe((result:any) => {
					if(result) {
						this.userInfo = {
			                token_key: result['data'].accessToken,
			                role: result['data']['role'],
			                email: result['data']['email'],
			                _id: result['data']['_id'],
			                imageUrl: result['data']['imageUrl'],
			                provider: result['data']['provider'],
			                gender: result['data']['gender']
			            }
			            localStorage.setItem("userInfo",JSON.stringify(this.userInfo));
			            this.spinner.hide();
						this.toasterService.success(CodeConstants.MSGS.LOGIN_SUCCESS);
						this.router.navigateByUrl(this.userInfo.role +'/dashboard');	
					} else {
						this.spinner.hide();
						this.toasterService.error(CodeConstants.MSGS.ERROR_MSG);
					}
				},
				err => {
					this.spinner.hide();
					if(err && err.error && err.error.errorType === "Custom" && err.error.message) { 
						this.toasterService.error(err.error.message);
					} else {
						this.toasterService.error(CodeConstants.MSGS.ERROR_MSG);
					}
				});
				
			}
        });
	}

    onSubmit(){
    	this.spinner.show();
    	this.userService.authUser(this.loginuser).subscribe((result:any)=>{
			console.log(result)
			this.userInfo = {
				token_key: result['data'].accessToken,
				role: result['data']['role'],
				email: result['data']['email'],
				_id: result['data']['_id'],
				imageUrl: result['data']['imageUrl'],
				provider: result['data']['provider'],
				gender: result['data']['gender'],
				name: result['data']['name']
			}
			localStorage.setItem("userInfo",JSON.stringify(this.userInfo));
			this.spinner.hide();
			this.toasterService.success(CodeConstants.MSGS.LOGIN_SUCCESS);
			this.router.navigateByUrl(this.userInfo.role +'/dashboard');
		},
		err=>{
			this.spinner.hide();
			if(err && err.error && err.error.errorType === "Custom" && err.error.message) { 
				this.toasterService.error(err.error.message);
			} else { 
				this.toasterService.error(CodeConstants.MSGS.ERROR_MSG,' ',{
					timeOut: 10000
				});
			}
		});
	}

	showRecoverForm() {
		this.loginform = !this.loginform;
		this.recoverform = !this.recoverform;
	}

}

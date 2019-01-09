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
		private toasterservice:ToastrService,
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			let token = params['token'];
			if(token!=null) {
				this.spinner.show();
				this.userService.getUserByToken(token).subscribe((result:any) => {
					console.log(result);
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
						this.toasterservice.success(CodeConstants.MSGS.LOGIN_SUCCESS);
						this.router.navigateByUrl('user/dashboard');	
					} else {
						this.spinner.hide();
						this.toasterservice.error(CodeConstants.MSGS.ERROR_MSG);
					}
				},
				err => {
					this.spinner.hide();
					this.toasterservice.error(CodeConstants.MSGS.ERROR_MSG);
				});
				
			}
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

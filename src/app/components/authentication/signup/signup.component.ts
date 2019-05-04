import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { SpinnerService } from '../../../services/spinner.service';
import { CodeConstants } from "../../../code_constants";
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent {
    public baseUrl = environment.baseUrl;
	public user: any = {  }
    public passFlag = false;
	constructor(private spinner: SpinnerService, private userService: UserService) {}

    onSubmit(form: any) {
        if(this.user.password !== this.user.confirmPassword){
            this.passFlag = true;
        } else {
            this.passFlag = false;
            this.spinner.show();
            this.userService.createUser(this.user).subscribe(result => {
                this.spinner.hide();
                Swal.fire('Successful', 'Your registration is successful', 'success');
                form.submitted = false;
                form.reset();
            },
            err=> {
                this.spinner.hide();
                if(err && err.error && err.error.errorType === "Custom" && err.error.message) {
                    Swal.fire('Error',err.error.message, 'error');
                } else {
                    Swal.fire('Error', CodeConstants.MSGS.ERROR_MSG, 'error');
                }
            });
        }
    }
}

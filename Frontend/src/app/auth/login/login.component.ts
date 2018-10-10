import { ErrorList } from './../../shared/error';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  public error: any;
  private username: string;
  private password: string;
  // min number of characters
  public minChars: number;
  // regular expression
  public reGexUsername: RegExp;
  public reGexPassword: RegExp;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private errorList: ErrorList
  ) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    this.minChars = 5;
    this.reGexUsername = this.errorList.reGexUsername;
    this.reGexPassword = this.errorList.reGexPassword;
  }

  checkUsernameFormat(usernameIn: string) {
    if (usernameIn.length >= this.minChars && !this.reGexUsername.test(usernameIn)) {
      return true;
    } else {
      this.toastr.error(this.errorList.LOGIN_E002 + this.minChars,
        this.errorList.LOGIN_MESSAGE_ERROR, {
          timeOut: 3000,
        });
      return false;
    }
  }

  checkPasswordFormat(passwordIn: string) {
    if (passwordIn.length >= this.minChars && this.reGexPassword.test(passwordIn)) {
      return true;
    } else {
      this.toastr.error(this.errorList.LOGIN_E003,
        this.errorList.LOGIN_MESSAGE_ERROR, {
          timeOut: 3000,
        });
      return false;
    }
  }

  onSubmit() {
    if (this.checkUsernameFormat(this.username)
      && this.checkPasswordFormat(this.password)) {
      this.authenticationService.login(this.username, this.password)
        .pipe(first())
        .subscribe(result => {
          if (result === true) {
            // login successful
            this.router.navigate(['/home']);
            this.toastr.success('Hello ' + this.username,
              this.errorList.LOGIN_MESSAGE_SUCCESS);
          }
        }, error => {
          // username or password incorrect
          this.error = error;
          this.toastr.error(this.errorList.LOGIN_E001,
            this.errorList.LOGIN_MESSAGE_ERROR, {
              timeOut: 3000,
            });
        });
    }
  }
}

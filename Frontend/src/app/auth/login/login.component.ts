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
  public error: any;
  private txtUsername: string;
  private txtPassword: string;
  // ký tự tối thiểu
  public minUsernameChars: number;
  public minPasswordChars: number;
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
    // reset login
    this.authenticationService.logout();
    this.minUsernameChars = 5;
    this.minPasswordChars = 8;
    this.reGexUsername = this.errorList.reGexUsername;
    this.reGexPassword = this.errorList.reGexPassword;
  }

  // Tên hàm: checkUsernameFormat()
  // Mô tả: kiểm tra định dạng dữ liệu nhập của username
  // Tham số: usernameIn: string: chuỗi cần kiểm tra
  // Xử lý chi tiết 2.2.a.3/ 2.2.a.4/ 2.2.a.5: LOGIN_E002, LOGIN_E003, LOGIN_E004
  checkUsernameFormat(usernameIn: string) {
    if (usernameIn !== '') {
      if (usernameIn.length >= this.minUsernameChars) {
        if (!this.reGexUsername.test(usernameIn)) {
          return true;
        } else {
          this.toastr.error(this.errorList.LOGIN_E004,
            this.errorList.LOGIN_MESSAGE_ERROR, {
              timeOut: 3000,
            });
          return false;
        }
      } else {
        this.toastr.error(this.errorList.LOGIN_E003 + this.minUsernameChars,
          this.errorList.LOGIN_MESSAGE_ERROR, {
            timeOut: 3000,
          });
        return false;
      }
    } else {
      this.toastr.error(this.errorList.LOGIN_E002,
        this.errorList.LOGIN_MESSAGE_ERROR, {
          timeOut: 3000,
        });
      return false;
    }
  }

  // Tên hàm: checkPasswordFormat()
  // Mô tả: kiểm tra định dạng dữ liệu nhập của password
  // Tham số: passwordIn: string: chuỗi cần kiểm tra
  // Xử lý chi tiết 2.2.a.6/ 2.2.a.7/ 2.2.a.8: LOGIN_E005, LOGIN_E006, LOGIN_E007
  checkPasswordFormat(passwordIn: string) {
    if (passwordIn !== '') {
      if (passwordIn.length >= this.minPasswordChars) {
        if (this.reGexPassword.test(passwordIn)) {
          return true;
        } else {
          this.toastr.error(this.errorList.LOGIN_E007,
            this.errorList.LOGIN_MESSAGE_ERROR, {
              timeOut: 3000,
            });
          return false;
        }
      } else {
        this.toastr.error(this.errorList.LOGIN_E006 + this.minPasswordChars,
          this.errorList.LOGIN_MESSAGE_ERROR, {
            timeOut: 3000,
          });
        return false;
      }
    } else {
      this.toastr.error(this.errorList.LOGIN_E005,
        this.errorList.LOGIN_MESSAGE_ERROR, {
          timeOut: 3000,
        });
      return false;
    }
  }

  // Tên hàm: onSubmit()
  // Mô tả: kiểm tra username va password
  // Xử lý chi tiết 2.2.a.1/ 2.2.a.2: LOGIN_E001
  onSubmit() {
    const username = this.txtUsername;
    const password = this.txtPassword;
    if (this.checkUsernameFormat(this.txtUsername)
      && this.checkPasswordFormat(this.txtPassword)) {
      this.authenticationService.login(username, password)
        .pipe(first())
        .subscribe(result => {
          if (result === true) {
            // login successful
            this.router.navigate(['/home']);
            this.toastr.success('Hello ' + username,
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

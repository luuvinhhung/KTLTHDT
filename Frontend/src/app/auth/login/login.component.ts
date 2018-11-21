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
  // (2) Xử lý đăng nhập
  // 2. Xử lý check
  // a. Check hạng mục
  checkUsernameFormat(usernameIn: string) {
    if (usernameIn !== '') {
      if (usernameIn.length >= this.minUsernameChars) {
        if (!this.reGexUsername.test(usernameIn)) {
          return true;
        } else {
          // check hạng muc 2.a.5
          this.toastr.error(this.errorList.FORMAT_E004,
            this.errorList.MESSAGE_ERROR, {
              timeOut: 3000,
            });
          return false;
        }
      } else {
        // check hạng muc 2.a.4
        this.toastr.error(this.errorList.FORMAT_E003 + this.minUsernameChars,
          this.errorList.MESSAGE_ERROR, {
            timeOut: 3000,
          });
        return false;
      }
    } else {
      // check hạng muc 2.a.3
      this.toastr.error(this.errorList.FORMAT_E002,
        this.errorList.MESSAGE_ERROR, {
          timeOut: 3000,
        });
      return false;
    }
  }

  // Tên hàm: checkPasswordFormat()
  // Mô tả: kiểm tra định dạng dữ liệu nhập của password
  // Tham số: passwordIn: string: chuỗi cần kiểm tra
  // (2) Xử lý đăng nhập
  // 2. Xử lý check
  // a. Check hạng mục
  checkPasswordFormat(passwordIn: string) {
    if (passwordIn !== '') {
      if (passwordIn.length >= this.minPasswordChars) {
        if (this.reGexPassword.test(passwordIn)) {
          return true;
        } else {
          // check hạng muc 2.a.8
          this.toastr.error(this.errorList.FORMAT_E007,
            this.errorList.MESSAGE_ERROR, {
              timeOut: 3000,
            });
          return false;
        }
      } else {
        // check hạng muc 2.a.7
        this.toastr.error(this.errorList.FORMAT_E006 + this.minPasswordChars,
          this.errorList.MESSAGE_ERROR, {
            timeOut: 3000,
          });
        return false;
      }
    } else {
      // check hạng muc 2.a.6
      this.toastr.error(this.errorList.FORMAT_E005,
        this.errorList.MESSAGE_ERROR, {
          timeOut: 3000,
        });
      return false;
    }
  }

  // Tên hàm: onSubmit()
  // Mô tả: kiểm tra username va password
  // (2) Xử lý đăng nhập
  // 2. Xử lý check
  // a. Check hạng mục
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
              this.errorList.MESSAGE_SUCCESS);
          }
        }, error => {
          // username or password incorrect
          this.error = error;
          // check hạng muc 2.a.1 / 2.a.2
          this.toastr.error(this.errorList.FORMAT_E001,
            this.errorList.MESSAGE_ERROR, {
              timeOut: 3000,
            });
        });
    }
  }
}

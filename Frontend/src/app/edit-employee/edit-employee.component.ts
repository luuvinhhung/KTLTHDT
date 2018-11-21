import { AuthenticationService } from './../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from './../shared/services/employees.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEmployee } from '../core/models/IEmployee';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { ErrorList } from './../shared/error';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  private token: string;
  private admin: String = 'Admin';
  public currentUser: String = 'currentUser';
  public role: String = '';
  public isAd: Boolean = false;
  public isUser: Boolean = false;
  // ký tự tối thiểu
  public minPasswordChars: number;
  // regular expression
  public reGexPassword: RegExp;
  private repeatPassword: String = '';
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  public editEmployee: IEmployee = {
    username: '',
    password: ''
  };
  constructor(
    private _auth: AuthenticationService,
    private toastr: ToastrService,
    private _employeesService: EmployeesService,
    private errorList: ErrorList,
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.editEmployee = data;
  }

  ngOnInit() {
    this.minPasswordChars = 8;
    this.reGexPassword = this.errorList.reGexPassword;
    this.token = localStorage.getItem(this.currentUser.toString());
    if (this.token) {
      this.role = this._auth.getRole();
      if (this.role.indexOf(this.admin.toString()) !== -1) {
        this.isAd = true;
      } else {
        this.isUser = true;
      }
    }
  }
  // Tên hàm: checkPasswordFormat()
  // Mô tả: kiểm tra định dạng dữ liệu nhập của password
  // Tham số: passwordIn: string: chuỗi cần kiểm tra
  // (2) Xử lý chỉnh sửa
  // 2. Xử lý check
  // a. Check hạng mục
  checkPasswordFormat(passwordIn: string) {
    if (passwordIn !== '') {
      if (passwordIn.length >= this.minPasswordChars) {
        if (this.reGexPassword.test(passwordIn)) {
          return true;
        } else {
          // check hạng muc 2.a.3
          this.toastr.error(this.errorList.FORMAT_E007,
            this.errorList.MESSAGE_ERROR, {
              timeOut: 3000,
            });
          return false;
        }
      } else {
        // check hạng muc 2.a.2
        this.toastr.error(this.errorList.FORMAT_E006 + this.minPasswordChars,
          this.errorList.MESSAGE_ERROR, {
            timeOut: 3000,
          });
        return false;
      }
    } else {
      // check hạng muc 2.a.1
      this.toastr.error(this.errorList.FORMAT_E005,
        this.errorList.MESSAGE_ERROR, {
          timeOut: 3000,
        });
      return false;
    }
  }
  // Tên hàm: editAcc()
  // Mô tả: kiểm tra định dạng dữ liệu và chỉnh sửa thông tin nhan viên
  // Tham số: none
  // (2) Xử lý chỉnh sửa
  // 2. Xử lý check
  // a. Check hạng mục
  editAcc() {
    if (this.checkPasswordFormat(this.editEmployee.password.toString()) &&
      this.editEmployee.password === this.repeatPassword &&
      isNaN(this.editEmployee.phoneNumber) === false) {
      this._employeesService.editEmployee(this.editEmployee);
      this.dialogRef.close();
      // Toastr
      this.toastr.success(this.errorList.EMPLOYEE_MESSAGE_EDITED, this.errorList.MESSAGE_SUCCESS);
    } else if (this.editEmployee.password !== this.repeatPassword) {
       // check hạng muc 2.a.3
      this.toastr.error(this.errorList.EMPLOYEE_E001, this.errorList.MESSAGE_ERROR, {
        timeOut: 3000,
      });
    }
  }

}

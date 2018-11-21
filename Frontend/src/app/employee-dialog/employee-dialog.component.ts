import { IDepartment } from './../core/models/IDepartment';
import { DepartmentsService } from './../shared/services/departments.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from './../shared/services/employees.service';
import { IEmployee } from './../core/models/IEmployee';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, ErrorStateMatcher } from '@angular/material';
import { ErrorList } from './../shared/error';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent implements OnInit {
  form: FormGroup;
  departments: IDepartment[];
  public repeatPassword: String = '';
  // ký tự tối thiểu
  public minUsernameChars: number;
  public minPasswordChars: number;
  // regular expression
  public reGexUsername: RegExp;
  public reGexPassword: RegExp;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  constructor(
    private _departmentsService: DepartmentsService,
    private toastr: ToastrService,
    private _employeesService: EmployeesService,
    private formBuilder: FormBuilder,
    private errorList: ErrorList,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>
  ) { }

  employeeAdding: IEmployee = {
    username: '',
    password: '',
    phoneNumber: 0
  };

  ngOnInit() {
    this.minUsernameChars = 5;
    this.minPasswordChars = 8;
    this.reGexUsername = this.errorList.reGexUsername;
    this.reGexPassword = this.errorList.reGexPassword;
    this._departmentsService.getDepartments();
    this._departmentsService.departments.subscribe(departments => {
      this.departments = departments;
    });
  }
  // Tên hàm: checkUsernameFormat()
  // Mô tả: kiểm tra định dạng dữ liệu nhập của username
  // Tham số: usernameIn: string: chuỗi cần kiểm tra
  // (2) Xử lý thêm
  // 2. Xử lý check
  // a. Check hạng mục
  checkUsernameFormat(usernameIn: string) {
    if (usernameIn !== '') {
      if (usernameIn.length >= this.minUsernameChars) {
        if (!this.reGexUsername.test(usernameIn)) {
          return true;
        } else {
          // check hạng muc 2.a.3
          this.toastr.error(this.errorList.FORMAT_E004,
            this.errorList.MESSAGE_ERROR, {
              timeOut: 3000,
            });
          return false;
        }
      } else {
        // check hạng muc 2.a.2
        this.toastr.error(this.errorList.FORMAT_E003 + this.minUsernameChars,
          this.errorList.MESSAGE_ERROR, {
            timeOut: 3000,
          });
        return false;
      }
    } else {
      // check hạng muc 2.a.1
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
  // (2) Xử lý thêm
  // 2. Xử lý check
  // a. Check hạng mục
  checkPasswordFormat(passwordIn: string) {
    if (passwordIn !== '') {
      if (passwordIn.length >= this.minPasswordChars) {
        if (this.reGexPassword.test(passwordIn)) {
          return true;
        } else {
          // check hạng muc 2.a.6
          this.toastr.error(this.errorList.FORMAT_E007,
            this.errorList.MESSAGE_ERROR, {
              timeOut: 3000,
            });
          return false;
        }
      } else {
        // check hạng muc 2.a.5
        this.toastr.error(this.errorList.FORMAT_E006 + this.minPasswordChars,
          this.errorList.MESSAGE_ERROR, {
            timeOut: 3000,
          });
        return false;
      }
    } else {
      // check hạng muc 2.a.4
      this.toastr.error(this.errorList.FORMAT_E005,
        this.errorList.MESSAGE_ERROR, {
          timeOut: 3000,
        });
      return false;
    }
  }

  // Tên hàm: addEmployee()
  // Mô tả: kiểm tra format và thêm nhân viên
  // (2) Xử lý thêm
  // 2. Xử lý check
  // a. Check hạng mục
  addEmployee() {
    this.employeeAdding.email = this.emailFormControl.value;
    if (
      this.checkUsernameFormat(this.employeeAdding.username.toString()) &&
      this.checkPasswordFormat(this.employeeAdding.password.toString()) &&
      isNaN(this.employeeAdding.phoneNumber) === false && this.employeeAdding.Branch_Id !== 0) {
      this._employeesService.createEmployee(this.employeeAdding);
      this.dialogRef.close();
      // Toastr
      this.toastr.success(this.errorList.EMPLOYEE_MESSAGE_ADDED, this.errorList.MESSAGE_SUCCESS);
    } else if (this.employeeAdding.password !== this.repeatPassword) {
      // check hạng muc 2.a.7
      this.toastr.error(this.errorList.EMPLOYEE_E001, this.errorList.MESSAGE_ERROR, {
        timeOut: 3000,
      });
    } else if (isNaN(this.employeeAdding.phoneNumber) === true) {
      // check hạng muc 2.a.8
      this.toastr.error(this.errorList.EMPLOYEE_E002, this.errorList.MESSAGE_ERROR, {
        timeOut: 3000,
      });
    } else {
      // check hạng muc 2.a.9
      this.toastr.error(this.errorList.EMPLOYEE_E003, this.errorList.MESSAGE_ERROR, {
        timeOut: 3000,
      });
    }
  }
  // Tên hàm: chooseBranch()
  // Mô tả: lấy id chi nhánh gắn cho nhân viên đang thêm
  // Tham số: department: IDepartment
  chooseBranch(department) {
    this.employeeAdding.BranchIdTemp = department.Id;
  }
}

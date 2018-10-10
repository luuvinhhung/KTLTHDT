import { AuthenticationService } from './../shared/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from './../shared/services/employees.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEmployee } from '../core/models/IEmployee';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
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
  token = localStorage.getItem('currentUser');
  role: String = '';
  isAd: Boolean = false;
  isUser: Boolean = false;
  private repeatPassword: String = '';
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  editEmployee: IEmployee = {
    username: '',
    password: ''
  };
  constructor(
    private _auth: AuthenticationService,
    private toastr: ToastrService,
    private _employeesService: EmployeesService,
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.editEmployee = data;
  }

  ngOnInit() {
    if (this.token) {
      this.role = this._auth.getRole();
      if (this.role.indexOf('Admin') !== -1) {
        this.isAd = true;
      } else {
        this.isUser = true;
      }
    }
  }

  editAcc() {
    if (this.editEmployee.password !== '' && this.editEmployee.password === this.repeatPassword
      && isNaN(this.editEmployee.phoneNumber) === false) {
      this._employeesService.editEmployee(this.editEmployee);
      this.dialogRef.close();
      // Toastr
      this.toastr.success('Saved!', 'Success!');
    } else if (this.editEmployee.password !== this.repeatPassword) {
      this.toastr.error('Confirm Password Not Match', 'Error!', {
        timeOut: 3000,
      });
    } else if (isNaN(this.editEmployee.phoneNumber) === true) {
      this.toastr.error('Phone Numbers must be Numeric only!', 'Error!', {
        timeOut: 3000,
      });
    }
  }

}

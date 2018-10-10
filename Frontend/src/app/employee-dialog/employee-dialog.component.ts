import { IDepartment } from './../core/models/IDepartment';
import { DepartmentsService } from './../shared/services/departments.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from './../shared/services/employees.service';
import { IEmployee } from './../core/models/IEmployee';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, ErrorStateMatcher } from '@angular/material';
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
    private dialogRef: MatDialogRef<EmployeeDialogComponent>
  ) { }

  employeeAdding: IEmployee = {
    username: '',
    password: '',
    phoneNumber: 0
  };

  ngOnInit() {
    this._departmentsService.getDepartments();
    this._departmentsService.departments.subscribe(departments => {
      this.departments = departments;
    });
  }
  chooseBranch(department) {
    this.employeeAdding.BranchIdTemp = department.Id;
  }
  addEmployee() {
    this.employeeAdding.email = this.emailFormControl.value;
    if (this.employeeAdding.username !== '' && this.employeeAdding.password !== '' &&
      isNaN(this.employeeAdding.phoneNumber) === false && this.employeeAdding.Branch_Id !== 0) {
      this._employeesService.createEmployee(this.employeeAdding);
      this.dialogRef.close();
      // Toastr
      this.toastr.success('Employee Added!', 'Success!');
    } else if (this.employeeAdding.password !== this.repeatPassword) {
      this.toastr.error('Confirm Password Not Match', 'Error!', {
        timeOut: 3000,
      });
    } else if (isNaN(this.employeeAdding.phoneNumber) === true) {
      this.toastr.error('Phone Numbers must be Numeric only!', 'Error!', {
        timeOut: 3000,
      });
    } else {
      this.toastr.error('User Name, Passowrd and Phone are required', 'Error!', {
        timeOut: 3000,
      });
    }
  }

}

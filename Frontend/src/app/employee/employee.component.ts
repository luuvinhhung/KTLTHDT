import { EditEmployeeComponent } from './../edit-employee/edit-employee.component';
import { AuthenticationService } from './../shared/services/authentication.service';
import { IDepartment } from './../core/models/IDepartment';
import { DepartmentsService } from './../shared/services/departments.service';
import { IEmployee } from './../core/models/IEmployee';
import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../shared/services/employees.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { filter } from 'rxjs/operators';
// import decode from 'jwt-decode';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  departments: IDepartment[];
  chooseDeparts: IDepartment[];
  removeEmploy: IEmployee;
  employees: IEmployee[];
  editEmployees: IEmployee = {
    username: '',
    password: '',
    Branch_Id: 1
  };
  chooseEmployees: IEmployee[];
  token = localStorage.getItem('currentUser');
  keyw: String = '';
  pageSize: Number = 1000;
  page: any = 1;
  disabledNextPageBtn: Boolean = false;
  numberOfItem: number;
  role: String = '';
  isAd: Boolean = false;
  public position: String = 'right';

  employeeDialogRef: MatDialogRef<EmployeeDialogComponent>;
  constructor(
    private _departmentsService: DepartmentsService,
    private _employeesService: EmployeesService,
    private _auth: AuthenticationService,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this._employeesService.getEmployees();
    this._employeesService.employees.subscribe(ems => {
      this.employees = ems;
      this.chooseEmployees = ems;
    });
    this._departmentsService.getDepartments();
    this._departmentsService.departments.subscribe(departments => {
      this.departments = departments;
      this.chooseDeparts = departments;
    });
    this.role = this._auth.getRole();
    if (this.role.indexOf('Admin') !== -1) {
      this.isAd = true;
    }
    // Sort employ by name
    this.employees.sort((a, b) => {
      const nameA = a.fullName.toLowerCase();
      const nameB = b.fullName.toLowerCase();
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
    // const tokenPayload = decode(this.token);
    // console.log(tokenPayload.role);
    // console.log(tokenPayload.nameid);
  }

  // getByIdEmployee(employ: IEmployee) {
  //   this._employeesService.getEmployeesByIdFromServer(employ.Id);
  //   this._employeesService.employees.subscribe(ems => {
  //     this.editEmployees = ems;
  //   });
  // }
  openEditEmployeeDialog(editEmployee: IEmployee) {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '400px',
      height: 'auto',
      data: editEmployee
    });
  }
  chooseRemoveEmploy(employee) {
    this.removeEmploy = employee;
  }
  delEmployee() {
    this._employeesService.removeEmployee(this.removeEmploy.Id);
  }

  searchEmployee(key: string) {
    this.employees = this.chooseEmployees.filter(em => em.fullName.toLowerCase().includes(key.toLowerCase()));
  }
  sortBranch(department: IDepartment) {
    console.log(department.Id);
    this._employeesService.getEmployees();
    this._employeesService.employees.subscribe(ems => {
      this.employees = ems.filter(em => em.BranchIdTemp.toString().toLowerCase().includes(department.Id.toString().toLowerCase()));
      this.chooseEmployees = ems;
    });
  }
  // addEmployee(employeeAdd) {
  //   this._employeesService.createEmployee(employeeAdd);
  // }

  // popup button add
  openAddEmpDialog() {
    this.employeeDialogRef = this.dialog.open(EmployeeDialogComponent, {
      hasBackdrop: false,
      width: '500px',
      height: '600px'
    });

    // this.employeeDialogRef
    //   .afterClosed()
    //   .pipe(filter(name => name))
    //   .subscribe((name) => this.employees.push({  HoTen: name, DiaChi: '',
    // }));
  }


}

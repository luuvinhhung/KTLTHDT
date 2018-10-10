import { EditEmployeeComponent } from './../../edit-employee/edit-employee.component';
import { EmployeesService } from './../../shared/services/employees.service';
import { IEmployee } from './../../core/models/IEmployee';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: String = localStorage.getItem('currentUser');
  access: Boolean;
  index: number;
  accounts: IEmployee[];
  UserId: string;
  editAccount: IEmployee = {
    username: '',
    password: '',
  };
  // @Output() sidenavToggle = new EventEmitter<void>();
  employeeDialogRef: MatDialogRef<EditEmployeeComponent>;
  constructor(
    private _employeeService: EmployeesService,
    private toastr: ToastrService,
    private router: Router,
    private _auth: AuthenticationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.currentUser) {
      const tokenPayload = decode(this.currentUser);
      this.UserId = tokenPayload.nameid;
      // console.log(typeof this.UserId);
      this.access = true;
    }
    const page = 1;
    const pageSize = 1000;
    this._employeeService.getEmployees();
    this._employeeService.employees.subscribe(ems => {
      this.editAccount = ems.find(em => em.Id.toString().toLowerCase().includes(this.UserId.toLowerCase()));
    });
  }
  // onToggleSidenav() {
  //   this.sidenavToggle.emit();
  // }
  logout() {
    this._auth.logout();
    this.router.navigate(['../login']);
    this.toastr.success('Good bye!', 'Logout Success!');
  }
  openEditUserDialog() {
    this.employeeDialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '500px',
      height: '610px',
      data: this.editAccount
    });
  }
}

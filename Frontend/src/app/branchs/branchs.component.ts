import { ToastrService } from 'ngx-toastr';
import { IEmployee } from './../core/models/IEmployee';
import { EmployeesService } from './../shared/services/employees.service';
import { AuthenticationService } from './../shared/services/authentication.service';
import { IDepartment } from './../core/models/IDepartment';
import { DepartmentsService } from './../shared/services/departments.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BranchDialogComponent } from '../branch-dialog/branch-dialog.component';
import { filter } from 'rxjs/operators';
import decode from 'jwt-decode';

@Component({
  selector: 'app-branchs',
  templateUrl: './branchs.component.html',
  styleUrls: ['./branchs.component.scss']
})
export class BranchsComponent implements OnInit {
  token =  localStorage.getItem('currentUser');
  role: String = '';
  isAd: Boolean = false;
  allDepartments: IDepartment[];
  departments: IDepartment[];
  editDepartments: IDepartment[];
  editDepartments2: IDepartment = {
    BranchCode: '',
    Name: '',
    Address: '',
    PhoneNumber: 0,
  };
  employees: IEmployee[];
  chooseEmployees: IEmployee[];
  chooseDeparts: IDepartment[];
  keyw: String = '';
  disableNextPageBtn: Boolean = false;
  numberOfItem: number;
  branchDialogRef: MatDialogRef<BranchDialogComponent>;
  private confirmDel: boolean;
  constructor(
    private toastr: ToastrService,
    private _employeesService: EmployeesService,
    private _departmentsService: DepartmentsService,
    private _auth: AuthenticationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.role = this._auth.getRole();
    if (this.role.indexOf('Admin') !== -1) {
      this.isAd = true;
    }
    this._departmentsService.getDepartments();
    this._departmentsService.departments.subscribe(departments => {
      this.departments = departments;
      this.chooseDeparts = departments;
    });
    // sort by name
    this.departments.sort(function (a, b) {
      const nameA = a.Name; // ignore upper and lowercase
      const nameB = b.Name; // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }
  editDepartment(editDepartments2: IDepartment) {
    console.log(editDepartments2.Id);
    console.log(editDepartments2.BranchCode);
    this._departmentsService.editDepartment(editDepartments2);
  }
  getByIdDepartment(depart: IDepartment) {
    console.log(depart.Id);
    this._departmentsService.getDepartmentsByIdFromServer(depart.Id);

    this._departmentsService.departments.subscribe(departments => {
    this.editDepartments = departments;

    });
    // console.log(this.editDepartments.);
    // console.log(depart.Id);
  }

  // getByIdDepartment(depart: IDepartment) {
  //   this._departmentsService.getDepartmentsByIdFromServer(depart.Id);
  //   this._departmentsService.departments.subscribe(departments => {
  //   this.editDepartments = departments;
  //   });
  //   this.editDepartments2 = this.editDepartments.find(x => x.Id === depart.Id);
  //   console.log(this.editDepartments2.ChiNhanhId);

  // }
  delDepartment(depart: IDepartment) {
    this._employeesService.getEmployees();
    this._employeesService.employees.subscribe(ems => {
      this.employees = ems.filter(em => em.BranchIdTemp.toString().toLowerCase().includes(depart.Id.toString().toLowerCase()));
    });
    if (this.employees.length > 0) {
      this.confirmDel = confirm('This branch have ' + this.employees.length.toString() + ' employee(s)');
      // console.log(this.confirmDel);
      if (this.confirmDel) {
        this._departmentsService.removeDepartment(depart.Id);
        this.toastr.success(depart.Name + ' deleted' , 'Success!');
      }
    }
    // this._departmentsService.removeDepartment(depart.Id);
    // console.log(depart.Id);
  }
  searchDepart(keyw: string) {
    this._departmentsService.getDepartments();
    this._departmentsService.departments.subscribe(departments => {
      this.departments = departments.filter(depart => depart.Name.toLowerCase().includes(keyw.toLowerCase()));
    });
    // this.departments = this.chooseDeparts.filter(depart => depart.Name.toLowerCase().includes(keyw.toLowerCase()));
  }
  // addDepartment(departAdding) {
  //   this._departmentsService.createDepartment(departAdding);
  // }

  // popup button add
  openAddDialog() {
    this.branchDialogRef = this.dialog.open(BranchDialogComponent, {
      hasBackdrop: false,
      width: '400px',
      height: '500px'
    });
    // this.branchDialogRef
    //   .afterClosed().subscribe(departments => {
    //     this.departments = departments;
    //   });
    //   .afterClosed()
    //     .pipe(filter(name => name))
    //     .subscribe((name) => this.departments.push({ BranchCode: '', Name: name, Address: '',
    //     PhoneNumber: '', CreatedDate: new Date(), CreatedBy: this.user}));
  }
}

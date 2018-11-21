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
  public position: String = 'right';
  public currentUser: String = 'currentUser';
  public editDialogHeight: String = 'auto';
  public editDialogWidth: String = '600px';
  public addDialogHeight: String = '600px';
  public addDialogWidth: String = '500px';
  public departments: IDepartment[];
  public chooseDeparts: IDepartment[];
  public removeEmploy: IEmployee;
  public employees: IEmployee[];
  public editEmployees: IEmployee = {
    username: '',
    password: '',
    Branch_Id: 1
  };
  public chooseEmployees: IEmployee[];
  private token: string;
  private admin: String = 'Admin';
  private role: String = '';
  private isAd: Boolean = false;

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
    this.token = localStorage.getItem(this.currentUser.toString());
    if (this.token) {
    this.role = this._auth.getRole();
      if (this.role.indexOf(this.admin.toString()) !== -1) {
        this.isAd = true;
      }
    }
  }
  // Tên hàm: openEditEmployeeDialog()
  // Mô tả: Chuyển màn hình chỉnh sửa thông tin nhân viên
  // Tham số: editEmployee: IEmployee: nhân viên cần sửa thông tin
  openEditEmployeeDialog(editEmployee: IEmployee) {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: this.editDialogWidth.toString(),
      height: this.editDialogHeight.toString(),
      data: editEmployee
    });
  }

  // Tên hàm: chooseRemoveEmploy()
  // Mô tả: Tạo biến tạm lưu thông tin nhân viên cần xóa
  // Tham số: employee: IEmployee: nhân viên cần sửa xóa
  chooseRemoveEmploy(employee) {
    this.removeEmploy = employee;
    console.log(this.removeEmploy.Id);
  }

  // Tên hàm: delEmployee()
  // Mô tả: Xóa nhân viên sau khi confirm xóa
  // Tham số: none
  delEmployee() {
    this._employeesService.removeEmployee(this.removeEmploy.Id);
  }

  // Tên hàm: searchEmployee()
  // Mô tả: tìm nhân viên theo keyword
  // Tham số: key: string: keyword
  searchEmployee(key: string) {
    this.employees = this.chooseEmployees.filter(em => em.fullName.toLowerCase().includes(key.toLowerCase()));
  }
  // Tên hàm: sortBranch()
  // Mô tả: lọc nhân viên thuộc chi nhánh
  // Tham số: department: IDepartment: chi nhánh cần lọc nhân viên
  sortBranch(department: IDepartment) {
    console.log(department.Id);
    this._employeesService.getEmployees();
    this._employeesService.employees.subscribe(ems => {
      this.employees = ems.filter(em => em.BranchIdTemp.toString().toLowerCase().includes(department.Id.toString().toLowerCase()));
      this.chooseEmployees = ems;
    });
  }
  // Tên hàm: openAddEmpDialog()
  // Mô tả: Chuyển màn hình thêm nhân viên
  // Tham số: none
  openAddEmpDialog() {
    this.employeeDialogRef = this.dialog.open(EmployeeDialogComponent, {
      hasBackdrop: false,
      width: this.addDialogWidth.toString(),
      height: this.addDialogHeight.toString()
    });
  }


}

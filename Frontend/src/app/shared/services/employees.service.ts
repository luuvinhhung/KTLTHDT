import { IEmployee } from './../../core/models/IEmployee';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Identifiers } from '@angular/compiler';

@Injectable()
export class EmployeesService {
  private _employees: BehaviorSubject<Array<IEmployee>> = new BehaviorSubject(new Array());
  private employee: IEmployee;
  private token: string;
  public urlGet: string;
  public urlGetById: string;
  public urlDelete: string;
  public urlCreate: string;
  public urlUpdate: string;
  headers = new Headers();
  get employees() {
    return this._employees.asObservable();
  }
  constructor(private http: Http) {
    this.urlGet = 'http://localhost:8888/api/Accounts/GetAll';
    this.urlGetById = 'http://localhost:8888/api/Accounts/GetById/';
    this.urlDelete = 'http://localhost:8888/api/Accounts/Delete?code=';
    this.urlCreate = 'http://localhost:8888/api/Accounts/Create';
    this.urlUpdate = 'http://localhost:8888/api/Accounts/Update';
    this.token = localStorage.getItem('currentUser');
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.token
    });
  }
  getEmployees() {
    return this.getEmployeesFromServer();
  }
  private getEmployeesFromServer() {
    this.http.get(this.urlGet).subscribe(res => {
        const employees = res.json();
        this._employees.next(employees);
      });
  }
  getEmployeeById(id: number) {
    return this.getEmployeesByIdFromServer(id);
  }
  private getEmployeesByIdFromServer(id: number) {
    this.http.get(this.urlGetById + id).subscribe(res => {
      const employees = res.json();
      this._employees.next(employees);
    });
  }

  removeEmployee(id: number) {
    return this.http.delete(this.urlDelete + id, { headers: this.headers }).subscribe(() => {
      const index = this._employees.getValue().findIndex(b => b.Id === id);
      this._employees.getValue().splice(index, 1);
      this._employees.next(this._employees.getValue());
    });
  }
  createEmployee(employeeAdd: IEmployee) {
    return this.http.post(this.urlCreate, employeeAdd, { headers: this.headers }).subscribe(() => {
      this._employees.getValue().push(employeeAdd);
      const newEmploy = this._employees.getValue();
      this._employees.next(newEmploy);
    });
  }
  editEmployee(employEdit: IEmployee) {
    return this.http.put(this.urlUpdate, employEdit, { headers: this.headers }).subscribe(() => {
      const index = this._employees.getValue().findIndex(emp => emp.Id === employEdit.Id);
      this._employees.getValue()[index] = employEdit;
      this._employees.next(this._employees.getValue());
    });
  }

}

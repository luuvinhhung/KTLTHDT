import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IDepartment } from './../../core/models/IDepartment';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Identifiers } from '@angular/compiler';

@Injectable()
export class DepartmentsService {
  private _departments: BehaviorSubject<Array<IDepartment>> = new BehaviorSubject(new Array());
  private department: IDepartment;
  private token: string;
  public urlGet: string;
  public urlGetById: string;
  public urlDelete: string;
  public urlCreate: string;
  public urlUpdate: string;
  headers = new Headers();
  get departments() {
    return this._departments.asObservable();
  }
  constructor(private http: Http) {
    this.urlGet = 'http://localhost:8888/api/Branch/GetAll';
    this.urlGetById = 'http://localhost:8888/api/Branch/GetByCode?code=';
    this.urlDelete = 'http://localhost:8888/api/Branch/Delete?code=';
    this.urlCreate = 'http://localhost:8888/api/Branch/Create';
    this.urlUpdate = 'http://localhost:8888/api/Branch/Update';
    this.token = localStorage.getItem('currentUser');
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + this.token
    });
   }
  getDepartments() {
    return this.getDepartmentsFromServer();
  }
  private getDepartmentsFromServer() {
    this.http.get(this.urlGet).subscribe(res => {
      const departments = res.json();
      this._departments.next(departments);
    });
  }
  getDepartmentsByIdFromServer(id) {
    this.http.get(this.urlGetById + id).subscribe(res => {
      const departments = res.json();
      this._departments.next(departments);
    });
  }
  removeDepartment(id: number) {
    return this.http.delete(this.urlDelete + id, { headers: this.headers }).subscribe(() => {
      const index = this._departments.getValue().findIndex(b => b.Id === id);
      this._departments.getValue().splice(index, 1);
      this._departments.next(this._departments.getValue());
    });
  }
  createDepartment(departAdd: IDepartment) {
    return this.http.post(this.urlCreate, departAdd, { headers: this.headers }).subscribe(() => {
      this._departments.getValue().push(departAdd);
      const newDepart = this._departments.getValue();
      this._departments.next(newDepart);
    });
  }
  editDepartment(departEdit: IDepartment) {
    return this.http.put(this.urlUpdate, departEdit, { headers: this.headers }).subscribe(() => {
      const index = this._departments.getValue().findIndex(de => de.Id === departEdit.Id);
      this._departments.getValue()[index] = departEdit;
      this._departments.next(this._departments.getValue());
    });
  }

}

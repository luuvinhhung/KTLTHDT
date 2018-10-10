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
  headers = new Headers();
  get departments() {
    return this._departments.asObservable();
  }
  constructor(private http: Http) {
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
    this.http.get('http://localhost:8888/api/Branch/GetAll').subscribe(res => {
      const departments = res.json();
      this._departments.next(departments);
    });
  }
  getDepartmentsByIdFromServer(id) {
    this.http.get('http://localhost:8888/api/Branch/GetByCode?code=' + id).subscribe(res => {
      const departments = res.json();
      this._departments.next(departments);
    });
  }
  removeDepartment(id: number) {
    return this.http.delete('http://localhost:8888/api/Branch/Delete?code=' + id, { headers: this.headers }).subscribe(() => {
      const index = this._departments.getValue().findIndex(b => b.Id === id);
      this._departments.getValue().splice(index, 1);
      this._departments.next(this._departments.getValue());
    });
  }
  createDepartment(departAdd: IDepartment) {
    return this.http.post('http://localhost:8888/api/Branch/Create', departAdd, { headers: this.headers }).subscribe(() => {
      this._departments.getValue().push(departAdd);
      const newDepart = this._departments.getValue();
      this._departments.next(newDepart);
    });
  }
  editDepartment(departEdit: IDepartment) {
    return this.http.put('http://localhost:8888/api/Branch/Update', departEdit, { headers: this.headers }).subscribe(() => {
      const index = this._departments.getValue().findIndex(de => de.Id === departEdit.Id);
      this._departments.getValue()[index] = departEdit;
      this._departments.next(this._departments.getValue());
    });
  }

}

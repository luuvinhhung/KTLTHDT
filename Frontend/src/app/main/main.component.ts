import { AuthenticationService } from './../shared/services/authentication.service';
import { IEmployee } from './../core/models/IEmployee';
import { EmployeesService } from './../shared/services/employees.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public _opened: Boolean = false;
  public _docked: Boolean = true;
  public _mode: String = 'over';
  public _dockedSize: String = '60px';
  public _backDrop: Boolean = false;
  public activeDashboard: Boolean = false;
  public activeDepartments: Boolean = false;
  public activeEmployees: Boolean = false;
  public activeProducts: Boolean = false;
  public position: String = 'right';
  private role: String = '';
  private isAd: Boolean = false;
  constructor(
    private _auth: AuthenticationService,
    private route: Router,
    private _employeesService: EmployeesService
  ) { }

  ngOnInit() {
    this.role = this._auth.getRole();
    if (this.role.indexOf('Admin') !== -1) {
      this.isAd = true;
    }
  }
  private _toggleSidebar() {
    this._opened = !this._opened;
    this._docked = !this._docked;
  }

  dashboard() {
    this.route.navigate(['/home/dashboard']);
    this.activeDashboard = true;
  }

  depart() {
    this.route.navigate(['/home/branchs']);
    this.activeDepartments = true;
    this.activeDashboard = this.activeEmployees = this.activeProducts = false;
  }
  employ() {
    this.route.navigate(['/home/employees']);
    this.activeEmployees = true;
    this.activeDashboard = this.activeDepartments = this.activeProducts = false;
  }
  product() {
    this.route.navigate(['/home/products']);
    this.activeProducts = true;
    this.activeDashboard = this.activeEmployees = this.activeDepartments = false;
  }
}

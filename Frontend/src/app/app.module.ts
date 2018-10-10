import { ErrorList } from './shared/error';
import { AdminGuard } from './shared/services/admin-guard.service';
import { ProductDialogComponent } from './product.dialog/product.dialog.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { HomeGuard } from './shared/services/home-guard.service';
import { EmployeesService } from './shared/services/employees.service';
import { ProductsService } from './shared/services/products.service';
import { DepartmentsService } from './shared/services/departments.service';
import { MainComponent } from './main/main.component';
import { BranchsComponent } from './branchs/branchs.component';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navgation/header/header.component';
import { SidenavListComponent } from './navgation/sidenav-list/sidenav-list.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { SidebarModule } from 'ng-sidebar';
import { BranchDialogComponent } from './branch-dialog/branch-dialog.component';
import { ToastrModule } from 'ngx-toastr';

import { FusionChartsModule } from 'angular4-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { ChartsComponent } from './charts/charts.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';


FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    ProductsComponent,
    CartComponent,
    BranchsComponent,
    HeaderComponent,
    MainComponent,
    BranchDialogComponent,
    ChartsComponent,
    EmployeeComponent,
    EmployeeDialogComponent,
    EditEmployeeComponent,
    ProductDialogComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    FusionChartsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [DepartmentsService, EmployeesService,
    ProductsService, AdminGuard,
    HomeGuard, AuthenticationService,
    ErrorList
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditEmployeeComponent, BranchDialogComponent, EmployeeDialogComponent, ProductDialogComponent]
})
export class AppModule { }

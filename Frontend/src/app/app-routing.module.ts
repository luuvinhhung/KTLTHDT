import { EmployeeComponent } from './employee/employee.component';
import { BranchsComponent } from './branchs/branchs.component';
import { LoginComponent } from './auth/login/login.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ChartsComponent } from './charts/charts.component';
import { HomeGuard } from './shared/services/home-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from './shared/services/admin-guard.service';

const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    }, {
        path: 'login', component: LoginComponent
    }, {
        path: 'home', component: MainComponent, canActivate: [HomeGuard]
        , children: [
            {
                path: '', redirectTo: 'introduce', pathMatch: 'full'
            },
            {
                path: 'introduce', component: HomeComponent
            },
            {
                path: 'branchs', component: BranchsComponent, canActivate: [AdminGuard]
            },
            {
                path: 'employees', component: EmployeeComponent, canActivate: [AdminGuard]
            },
            {
                path: 'products', component: ProductsComponent
            },
            {
                path: 'cart', component: CartComponent
            },
            {
                path: 'employee', component: EmployeeComponent
            }
            , {
                path: 'dashboard', component: DashboardComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}

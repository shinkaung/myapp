import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierInlineComponent } from './supplier/supplier-inline.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeComponent } from './employee/employee.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            {path: 'heroes',component: HeroesComponent},
            {path: 'detail/:id', component: HeroDetailComponent},
            {path: 'employees', component: EmployeeComponent},
            {path: 'empdetail/:id', component: EmployeeDetailComponent},
            { path: 'customers', loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule) },
            { path: 'suppliers', loadChildren: () => import('./supplier/supplier.module').then((m) => m.SupplierModule) },
            { path: 'report', loadChildren: () => import('./report/report.module').then((m) => m.ReportModule) },
            { path: 'admins', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then((m) => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then((m) => m.TablesModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then((m) => m.FormModule) },
            {
                path: 'bs-element',
                loadChildren: () => import('./bs-element/bs-element.module').then((m) => m.BsElementModule)
            },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then((m) => m.GridModule) },
            {
                path: 'components',
                loadChildren: () => import('./bs-component/bs-component.module').then((m) => m.BsComponentModule)
            },
            {
                path: 'blank-page',
                loadChildren: () => import('./blank-page/blank-page.module').then((m) => m.BlankPageModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}

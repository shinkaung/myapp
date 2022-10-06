import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list.component';
import { CustomerAddComponent } from './customer-add.component';
import { CustomerDetailComponent } from './customer-detail.component';

const routes: Routes = [
  {path: '',component: CustomerListComponent},
  {path: 'add',component: CustomerAddComponent},
  {path: ':id', component: CustomerDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

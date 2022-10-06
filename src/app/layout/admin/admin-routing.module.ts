import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListComponent } from './admin-list.component';
import { AdminAddComponent } from './admin-add.component';
import { AdminDetailComponent } from './admin-detail.component';

const routes: Routes = [
  {path: '',component: AdminListComponent},
  {path: 'add',component: AdminAddComponent},
  {path: ':id',component: AdminDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

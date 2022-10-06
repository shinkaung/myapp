import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierInlineComponent } from './supplier-inline.component';
import { SupplierDetailComponent } from './supplier-detail.component';
import { SupplierListComponent } from './supplier-list.component';

const routes: Routes = [
  {path: '', component: SupplierListComponent},
  {path: 'detail/:id', component: SupplierDetailComponent},
  {path: 'inline', component: SupplierInlineComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }

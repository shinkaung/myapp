import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierListComponent } from './supplier-list.component';
import { SupplierDetailComponent } from './supplier-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DatePickerModule, TemplatesModule } from '@progress/kendo-angular-dateinputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { SupplierInlineComponent } from './supplier-inline.component';
import { UploadsModule } from '@progress/kendo-angular-upload';


@NgModule({
  declarations: [
    SupplierListComponent,
    SupplierDetailComponent,
    SupplierInlineComponent
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FormsModule,
    ButtonModule,
    GridModule,
    DropDownListModule,
    ReactiveFormsModule,
    DatePickerModule,
    DialogsModule,
    UploadsModule
  ]
})
export class SupplierModule { }

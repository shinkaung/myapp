import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminListComponent } from './admin-list.component';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { GridComponent, GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { AdminAddComponent } from './admin-add.component';
import { AdminDetailComponent } from './admin-detail.component';


@NgModule({
  declarations: [
    AdminListComponent,
    AdminAddComponent,
    AdminDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    GridModule,
    DropDownListModule,
    DatePickerModule,
    TranslateModule,
    UploadsModule
  ]
})
export class AdminModule { }

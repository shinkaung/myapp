import {Component, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list.component';
import { CustomerDetailComponent } from './customer-detail.component';
import { CustomerAddComponent } from './customer-add.component';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { GridComponent, GridModule } from '@progress/kendo-angular-grid';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { UploadsModule } from '@progress/kendo-angular-upload';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerDetailComponent,
    CustomerAddComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
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
export class CustomerModule { }



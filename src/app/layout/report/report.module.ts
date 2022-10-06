import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { CustomerReportComponent } from './customer-report.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DatePickerComponent, DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { FormModule } from '../form/form.module';
import { ButtonModule } from '@progress/kendo-angular-buttons';


@NgModule({
  declarations: [
    CustomerReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    GridModule,
    ReactiveFormsModule,
    DropDownsModule,
    DatePickerModule,
    FormModule,
    ButtonModule
  ]
})
export class ReportModule { }

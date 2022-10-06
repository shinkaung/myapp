import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { CustomerService } from '../../core/services/customer.service';
import { CustomerType } from '../../core/models/customertype';
import { CustomerTypeService } from '../../core/services/customertype.service';
import { formatDate } from '@angular/common';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.scss']
})
export class CustomerReportComponent implements OnInit {
  public reportgrid: Observable<GridDataResult>;
  public showSearchStr: string = 'Show filter';
  public isSearchOpened: boolean = false;
  public customertypes: CustomerType[];
  public gridState: State = {
    sort: [{ 'field': 'ID', 'dir': 'asc'}],
    skip: 0,
    take: 0,
    filter: { logic: 'and', filters: []}
  };

  reportForm = this.formbuilder.group({
    CustomerName: [''],
    CustomerTypeId: [''],
    FromDate: [''],
    ToDate: ['']
  });

  constructor(private formbuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale: string,
    private customertypeservice: CustomerTypeService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customertypeservice.getCustomerTypes().subscribe(res => this.customertypes = res);
    this.reportgrid = this.customerService;

    const currentState = JSON.parse(localStorage.getItem('MyCustomerReportState'));
    if (currentState != null) {
      if(currentState.FromDate != null && currentState.FromDate!="")
      {
        currentState.FromDate=new Date(currentState.FromDate);
      }
      if(currentState.ToDate != null && currentState.ToDate!="")
      {
        currentState.ToDate=new Date(currentState.ToDate);
      }
      this.reportForm.reset(currentState);
    }
    else{
      localStorage.setItem('MyCustomerReportState', JSON.stringify(this.reportForm.value));
    }
    this.Search();
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.gridState = state;
    this.Search();
  }

  Search(): void{
    localStorage.setItem('MyCustomerReportState', JSON.stringify(this.reportForm.value));

    if(this.reportForm.value.FromDate != "" && this.reportForm.value.FromDate != null)
      this.reportForm.value.FromDate = formatDate(this.reportForm.value.FromDate, 'yyyy-MM-dd', this.locale);

    if(this.reportForm.value.ToDate != "" && this.reportForm.value.ToDate != null)
      this.reportForm.value.ToDate = formatDate(this.reportForm.value.ToDate, 'yyyy-MM-dd', this.locale);

    this.customerService.getCustomerReport(this.gridState, this.reportForm.value);
  }

  Clear() {
    this.reportForm.reset();
    localStorage.removeItem('MyCustomerReportState');
    this.customerService.getCustomerReport(this.gridState, this.reportForm.value);
  }

  showSearch(paraIsOpened) {
    if(paraIsOpened == false){
      this.isSearchOpened = true;
      this.showSearchStr = 'Hide Filter';
    }
    else{
      this.isSearchOpened = false;
      this.showSearchStr = 'Show Filter';
    }
  }

}

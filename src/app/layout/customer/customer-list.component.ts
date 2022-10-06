import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { Customer } from '../../core/models/customer';
import { CustomerService } from '../../core/services/customer.service';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public customergrid: GridDataResult;
  public gridState: DataSourceRequestState = {
    skip: 0,
    take: 5,
    filter: {logic: 'and', filters: []}
  };

  constructor(private customerService: CustomerService,
    private router: Router,
    private translateService: TranslateService) { }

  ngOnInit() {
    const currentState = localStorage.getItem('MyCustomerState');
    if (currentState != null) {
      this.gridState = JSON.parse(currentState);  
    }else {
      localStorage.setItem('MyCustomerState', JSON.stringify(this.gridState));
    }
    this.getCustomers();
  }

  getCustomers(): void {
    console.log(this.translateService.currentLang);
    this.customerService.getCustomerGrid(this.gridState)
        .subscribe(rescustomers => this.customergrid = rescustomers);
  }
          
delete(Customer: Customer): void {
  this.customerService.deleteCustomer(Customer.Id)
  .subscribe(deletestatus => {
    this.getCustomers();
    console.log(deletestatus);
  });
}

detail(Customer: Customer): void {
  this.router.navigate(['/customers/' + Customer.Id]);
}

onStateChange(dstate: DataStateChangeEvent): void {
  this.gridState = dstate;
  localStorage.setItem('MyCustomerState', JSON.stringify(this.gridState));
  this.getCustomers();
}
}
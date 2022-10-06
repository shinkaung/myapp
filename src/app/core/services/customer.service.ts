import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Customer } from '../models/customer';
import { MessageService } from './message.service';
import { ApiService } from './api.service';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BehaviorSubject<GridDataResult>{
  public gridLoading: boolean;

  constructor( 
    private apiservice: ApiService,
    private messageService: MessageService
    ) {super(null)}
    getCustomers(): Observable<Customer[]> {
      return this.apiservice.get("/Customers/");
    }
/** GET hero by id. Will 404 if id not found */
getCustomer(Id: number): Observable<Customer> {
  return this.apiservice.get(`/Customers/${Id}`);
}
getCustomerGrid(gridState: DataSourceRequestState): Observable<GridDataResult>{
  return this.apiservice.fetchgridpostJson('/Customers/showlist/',gridState);
}
    /** PUT: update the hero on the server */
updateCustomer(customer: Customer): Observable<any> {
  return this.apiservice.putJson(`/Customers/${customer.Id}`, customer);
}

/** POST: add a new hero to the server */
addCustomer(customer: Customer): Observable<Customer> {
  return this.apiservice.postJson("/Customers", customer);
}
/** DELETE: delete the hero from the server */
deleteCustomer(Id: number): Observable<Customer> {
  return this.apiservice.delete(`/Customers/${Id}`);
}

getImagePath(id: number): Observable<string> {
  var encryptdata = btoa(id.toString()); //convert to base64
  return this.apiservice.get('/fileservice/DownloadDir/CustomerPhoto/' + encryptdata);
}

deleteCustomerPhoto(id: number, filename: string): Observable<string> {
  var encryptdata = btoa(id.toString()); //convert to base64
  this.messageService.add(`CustomerService: delete Customer Photo=${id} ${filename}`);
  return this.apiservice.postJson('/fileservice/RemoveDir/CustomerPhoto/' + encryptdata, {filename: filename});
}

getCustomerReport(gridState: DataSourceRequestState, filterSet: any) {
  this.gridLoading = true;
  return this.apiservice.fetchgridpostJsonData('/Customers/report/', gridState, filterSet)
  .subscribe(x => {
    super.next(x);
    this.gridLoading = false;
  });
}
}
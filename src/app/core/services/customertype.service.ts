import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomerType } from '../models/customertype';
import { MessageService } from './message.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  constructor( 
    private apiservice: ApiService,
    private messageService: MessageService
    ) { }
    getCustomerTypes(): Observable<CustomerType[]> {
      return this.apiservice.get("/CustomerType/");
    }
/** GET hero by id. Will 404 if id not found */
getCustomerType(Id: number): Observable<CustomerType> {
  return this.apiservice.get(`/CustomerType/${Id}`);
}
    /** PUT: update the hero on the server */
updateCustomerType(customertype: CustomerType): Observable<any> {
  return this.apiservice.putJson(`/CustomerType/${customertype.Id}`, customertype);
}

/** POST: add a new hero to the server */
addCustomerType(customertype: CustomerType): Observable<CustomerType> {
  return this.apiservice.postJson("/CustomerType", customertype);
}
/** DELETE: delete the hero from the server */
deleteCustomerType(Id: number): Observable<CustomerType> {
  return this.apiservice.delete(`/CustomerType/${Id}`);
}
}
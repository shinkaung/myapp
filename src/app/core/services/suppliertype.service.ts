import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SupplierType } from '../models/suppliertype';
import { MessageService } from './message.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierTypeService {

  constructor( 
    private apiservice: ApiService,
    private messageService: MessageService
    ) { }
    getSupplierTypes(): Observable<SupplierType[]> {
      return this.apiservice.get("/SupplierTypes/");
    }
/** GET hero by id. Will 404 if id not found */
getSupplierType(Id: number): Observable<SupplierType> {
  return this.apiservice.get(`/SupplierTypes/${Id}`);
}
    /** PUT: update the hero on the server */
updateSupplierType(suppliertype: SupplierType): Observable<any> {
  return this.apiservice.putJson(`/SupplierTypes/${suppliertype.Id}`, suppliertype);
}

/** POST: add a new hero to the server */
addSupplierType(suppliertype: SupplierType): Observable<SupplierType> {
  return this.apiservice.postJson("/SupplierTypes", suppliertype);
}
/** DELETE: delete the hero from the server */
deleteSupplierType(Id: number): Observable<SupplierType> {
  return this.apiservice.delete(`/SupplierTypes/${Id}`);
}
}
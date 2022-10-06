import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Supplier } from '../models/supplier';
import { MessageService } from './message.service';
import { ApiService } from './api.service';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends BehaviorSubject<GridDataResult>{
  public gridLoading: boolean;

  constructor( 
    private apiservice: ApiService,
    private messageService: MessageService
    ) {super(null)};

    getSuppliers(): Observable<Supplier[]> {
      this.messageService.add('SupplierService: fetched suppliers');
      return this.apiservice.get("/Suppliers/");
    }

    getSupplierGrid(gridState: DataSourceRequestState) {
      this.gridLoading = true;
      return this.apiservice.fetchgridpostJson('/Suppliers/showlist', gridState)
      .subscribe((x) => {
        super.next(x);
        this.gridLoading = false;
      });
    }

/** GET hero by id. Will 404 if id not found */
getSupplier(Id: number): Observable<Supplier> {
  return this.apiservice.get(`/Suppliers/${Id}`);
}

    /** PUT: update the hero on the server */
updateSupplier(supplier: Supplier): Observable<any> {
  return this.apiservice.putJson(`/Suppliers/${supplier.Id}`, supplier);
}

/** POST: add a new hero to the server */
addSupplier(supplier: Supplier): Observable<Supplier> {
  return this.apiservice.postJson("/Suppliers", supplier);
}
/** DELETE: delete the hero from the server */
deleteSupplier(Id: number): Observable<Supplier> {
  return this.apiservice.delete(`/Suppliers/${Id}`);
}

getImagePath(id: number): Observable<string> {
  var encryptdata = btoa(id.toString()); //convert to base64
  return this.apiservice.get('/fileservice/Download/SupplierPhoto/' + encryptdata);
}

deleteSupplierPhoto(id: number): Observable<string>{
  var encryptdata = btoa(id.toString()); //convert to base64
  this.messageService.add(`SupplierService: delete Supplier Photo=${id}`);
  return this.apiservice.postJson('/fileservice/RemoveDir/SupplierPhoto/' + encryptdata, null); //string file
}
}
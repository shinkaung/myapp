import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AdminLevel } from '../models/adminlevel';
import { MessageService } from './message.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLevelService {

  constructor( 
    private apiservice: ApiService,
    private messageService: MessageService
    ) { }
    getAdminLevels(): Observable<AdminLevel[]> {
      return this.apiservice.get("/AdminLevel/");
    }
/** GET hero by id. Will 404 if id not found */
getAdminLevel(Id: number): Observable<AdminLevel> {
  return this.apiservice.get(`/AdminLevel/${Id}`);
}
    /** PUT: update the hero on the server */
updateAdminLevel(adminlevel: AdminLevel): Observable<any> {
  return this.apiservice.putJson(`/CustomerType/${adminlevel.Id}`, adminlevel);
}

/** POST: add a new hero to the server */
addAdminLevel(adminlevel: AdminLevel): Observable<AdminLevel> {
  return this.apiservice.postJson("/AdminLevel", adminlevel);
}
/** DELETE: delete the hero from the server */
deleteAdminLevel(Id: number): Observable<AdminLevel> {
  return this.apiservice.delete(`/AdminLevel/${Id}`);
}
}
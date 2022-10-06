import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Admin } from '../models/admin';
import { MessageService } from './message.service';
import { ApiService } from './api.service';
import { DataSourceRequestState } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( 
    private apiservice: ApiService,
    private messageService: MessageService
    ) { }
    getAdmins(): Observable<Admin[]> {
      return this.apiservice.get("/Admin/");
    }
/** GET hero by id. Will 404 if id not found */
getAdmin(Id: number): Observable<Admin> {
  return this.apiservice.get(`/Admin/${Id}`);
}
getAdminGrid(gridState: DataSourceRequestState): Observable<GridDataResult>{
  return this.apiservice.fetchgridpostJson('/Admin/showlist/',gridState);
}
    /** PUT: update the hero on the server */
updateAdmin(admin: Admin): Observable<any> {
  return this.apiservice.putJson(`/Admin/${admin.Id}`, admin);
}

/** POST: add a new hero to the server */
addAdmin(admin: Admin): Observable<Admin> {
  return this.apiservice.postJson("/Admin", admin);
}
getProfileImage(): Observable<string> {
  return this.apiservice.get('/FileService/ProfilePhoto');
}
/** DELETE: delete the hero from the server */
deleteAdmin(Id: number): Observable<Admin> {
  return this.apiservice.delete(`/Admin/${Id}`);
}

getImagePath(id: number): Observable<string> {
  var encryptdata = btoa(id.toString()); //convert to base64
  return this.apiservice.get('/fileservice/DownloadDir/AdminPhoto/' + encryptdata);
}

deleteAdminPhoto(id: number, filename: string): Observable<string> {
  var encryptdata = btoa(id.toString()); //convert to base64
  this.messageService.add(`AdminService: delete Admin Photo=${id} ${filename}`);
  return this.apiservice.postJson('/fileservice/RemoveDir/AdminPhoto/' + encryptdata, {filename: filename});
}
}
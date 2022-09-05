import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Employee } from './employee';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( 
    private apiservice: ApiService,
    private messageService: MessageService) { }

    getEmployees(): Observable<Employee[]> {
      return this.apiservice.get("/Employee/");
    }
/** GET employee by id. Will 404 if id not found */
getEmployee(id: number): Observable<Employee> {
  return this.apiservice.get(`/Employee/${id}`);
}
  private log(message: string): void {
    this.messageService.add(`EmployeeService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }; }

    /** PUT: update the hero on the server */
updateEmployee(employee: Employee): Observable<any> {
  return this.apiservice.putJson(`/Employee/${employee.id}`, employee);
}

/** POST: add a new hero to the server */
addEmployee(employee: Employee): Observable<Employee> {
  return this.apiservice.postJson("/Employee", employee);
}
/** DELETE: delete the hero from the server */
deleteEmployee(id: number): Observable<Employee> {
  return this.apiservice.delete(`/Employee/${id}`);
}
/* GET heroes whose name contains search term */
searchEmployee(term: string): Observable<Employee[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.apiservice.postJson("/Employee/search",{"term":term});
}
}

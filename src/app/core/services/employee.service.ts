import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Employee } from '../models/employee';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( 
    private apiservice: ApiService,
    private messageService: MessageService) { }

    getEmployees(): Observable<Employee[]> {
      return this.apiservice.get("/Employees/");
    }
/** GET employee by id. Will 404 if id not found */
getEmployee(id: number): Observable<Employee> {
  return this.apiservice.get(`/Employees/${id}`);
}
    /** PUT: update the employee on the server */
updateEmployee(employee: Employee): Observable<any> {
  return this.apiservice.putJson(`/Employees/${employee.Id}`, employee);
}
/** POST: add a new employee to the server */
addEmployee(employee: Employee): Observable<Employee> {
  return this.apiservice.postJson("/Employees", employee);
}
/** DELETE: delete the employee from the server */
deleteEmployee(id: number): Observable<Employee> {
  return this.apiservice.delete(`/Employees/${id}`);
}
/* GET employee whose name contains search term */
searchEmployee(term: string): Observable<Employee[]> {
  if (!term.trim()) {
    // if not search term, return empty employee array.
    return of([]);
  }
  return this.apiservice.postJson("/Employees/search",{"term":term});
}
}

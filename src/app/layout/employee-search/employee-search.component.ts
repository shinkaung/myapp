import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Employee } from '../../core/models/employee';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss']
})
export class EmployeeSearchComponent implements OnInit {

  employee$!: Observable<Employee[]>;
  private searchTerms = new Subject<string>();
  
  constructor(private employeeService: EmployeeService) { }

  
  ngOnInit(): void {
    this.employee$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.employeeService.searchEmployee(term)),
    );
  }
  search(term: string): void {
    this.searchTerms.next(term);
  }
}

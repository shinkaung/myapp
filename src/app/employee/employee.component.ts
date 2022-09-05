import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MessageService } from "/Users/shinkaung/training2022/myapp/src/app/message.service";


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
        .subscribe(employees => {
          if(employees != undefined){
            this.employees = employees;
            this.messageService.add("Fetch Employee Success")
          }
        }); 
      }
  add(empName: string,empAddress:string): void {
    empName = empName.trim();
    empAddress = empAddress.trim()
    if (!empName) { return; }
    this.employeeService.addEmployee({ empName,empAddress } as Employee)
      .subscribe(employee => {
        this.employees.push(employee);
        this.messageService.add("Add Employee Success")
      });
     console.log(this.employees)

  }
  delete(employee: Employee): void {
    this.employees = this.employees.filter(h => h !== employee);
    this.employeeService.deleteEmployee(employee.id).subscribe( x=> {
      if(x !== undefined){
        this.messageService.add(`Delete Employee Success.ID ${employee.empName}`)
      }
    });
  }
}
 
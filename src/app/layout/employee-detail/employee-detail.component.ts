import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../core/models/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { Location } from '@angular/common';
import { MessageService } from '../../core/services/message.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee?: Employee;

  constructor(private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getEmployee();
  }
  getEmployee(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.getEmployee(id)
      .subscribe(employee => this.employee = employee);
  }
  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    if (this.employee) {
      this.employeeService.updateEmployee(this.employee)
        .subscribe(() => this.goBack());
    }
  }

}


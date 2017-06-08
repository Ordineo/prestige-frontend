import { Account } from '../../../models/account';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-ranking',
  templateUrl: './employee-ranking.component.html',
  styleUrls: ['./employee-ranking.component.scss']
})
export class EmployeeRankingComponent implements OnInit {

  employees: Observable<Account[]>;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employees = this.employeeService.getAllEmployees().share();
  }

}

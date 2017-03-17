import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../providers/employee.service";
import { Observable } from "rxjs";

import 'rxjs/add/operator/merge';

import { FirebaseObjectObservable } from "angularfire2";
import { forEach } from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-employee-ranking',
  templateUrl: './employee-ranking.component.html',
  styleUrls: ['./employee-ranking.component.scss']
})
export class EmployeeRankingComponent implements OnInit {
  employees: Observable <any>;
  totalPrestige = 1;
  availableColors = [
    { name: 'none', color: '' },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' }
  ];

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.employeeService.get()
      .subscribe(result => {
        this.employees = result.users;
      });
  }

}

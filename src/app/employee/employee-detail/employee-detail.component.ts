import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Observable} from 'rxjs';

import { EmployeeService } from '../../providers/employee.service';

@Component({
  selector: 'employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  employee: Observable<any>;
  // EmployeeId = this.route.snapshot.params['id'];

  constructor(private route: ActivatedRoute,
              private employeeService : EmployeeService) {
  }

  getUser() {
    console.log(this.route.snapshot.params['id'], "id => user?")
    this.employeeService.getEmployeeById(this.route.snapshot.params['id']).subscribe(result => {
      this.employee =  result;
    });
  }

  ngOnInit() {
    this.getUser();
  }
}

import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Observable} from 'rxjs';

import { EmployeeService } from '../../providers/employee.service';
import {PrestigeService} from "../../providers/prestige.service";

@Component({
  selector: 'employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  employee: Observable<any>;
  grantedEndorsements: Observable<any>;
  receivedEndorsements: Observable<any>;
  // EmployeeId = this.route.snapshot.params['id'];

  constructor(private route: ActivatedRoute,
              private employeeService : EmployeeService,
              private endorsementsService: PrestigeService) {
  }

  // todo: correcte id weergeven
  getUser() {
    console.log(this.route.snapshot.params['id'], "id => user?");
    this.employeeService.getByUsername(this.route.snapshot.params['id']).subscribe(result => {
      this.employee = result;
      console.log(result);
    });
  }

  getGrantedEndorsements() {
    this.endorsementsService.findByGranter(this.route.snapshot.params['id']).subscribe(result => {
      this.grantedEndorsements = result.endorsements;
      console.log(result.endorsements);
    })
  }

  getReceivedEndorsements() {
    this.endorsementsService.findByReceiver(this.route.snapshot.params['id']).subscribe(result => {
      this.receivedEndorsements = result.endorsements;
      console.log(result.endorsements);
    })
  }

  ngOnInit() {
    this.getUser();
    this.getGrantedEndorsements();
    this.getReceivedEndorsements();
  }
}

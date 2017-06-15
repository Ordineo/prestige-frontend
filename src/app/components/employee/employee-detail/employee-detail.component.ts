import { Endorsement } from '../../../models/endorsement';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { EmployeeService } from '../../../services/employee.service';
import { EndorsementService } from '../../../services/endorsement.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  employee: Observable<Account>;
  grantedEndorsements: Observable<Endorsement[]>;
  receivedEndorsements: Observable<Endorsement[]>;

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private endorsementsService: EndorsementService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      ({id}) => {
        this.employee = this.employeeService.getByUsername(id).share();
        this.grantedEndorsements = this.endorsementsService.findByGranter(id).share();
        this.receivedEndorsements = this.endorsementsService.findByReceiver(id).share();
      }
    );
  }
}

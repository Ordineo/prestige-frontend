import { Account } from '../../../models/account';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { CategoryService } from '../../../services/category.service';
import { EmployeeService } from '../../../services/employee.service';
import { EndorsementService } from '../../../services/endorsement.service';
import { Endorsement } from '../../../models/endorsement';
import { Page } from '../../../models/page';

@Component({
  selector: 'app-add-endorsement',
  templateUrl: './add-endorsement.component.html',
  styleUrls: ['./add-endorsement.component.scss']
})

export class AddEndorsementComponent implements OnInit {

  public categories: Observable<string[]>;
  public employees: Observable<Page<Account>>;
  endorsement: Endorsement = new Endorsement();

  constructor(public dialogRef: MdDialogRef<any>,
              private categoryService: CategoryService,
              private employeeService: EmployeeService,
              private endorsementService: EndorsementService) {
  }

  ngOnInit() {
    this.categories = this.categoryService.getCategories().share();
    this.employees = this.employeeService.getEmployees(0, 1000).share();
  }

  addEndorsement() {
    this.endorsementService
      .addEndorsement(this.endorsement)
      .subscribe(() => {
        this.dialogRef.close();
        this.endorsementService.fireUpdateEndorsementsEvent();
      });
  }

  selectEmployee(employee: Account) {
    this.endorsement.receiverUsername = employee.username;
  }

}

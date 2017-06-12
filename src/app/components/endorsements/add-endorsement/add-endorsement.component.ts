import {Account} from '../../../models/account';
import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Rx';
import {CategoryService} from '../../../services/category.service';
import {EmployeeService} from '../../../services/employee.service';
import {EndorsementService} from '../../../services/endorsement.service';
import {Endorsement} from '../../../models/endorsement';

@Component({
  selector: 'app-add-endorsement',
  templateUrl: './add-endorsement.component.html',
  styleUrls: ['./add-endorsement.component.scss']
})

export class AddEndorsementComponent implements OnInit {

  public categories: Observable<string[]>;
  public employees: Observable<Account[]>;
  endorsement: Endorsement = new Endorsement();

  constructor(public dialogRef: MdDialogRef<any>,
    private categoryService: CategoryService,
    private employeeService: EmployeeService,
    private endorsementService: EndorsementService) {
  }

  addEndorsement() {
    this.endorsementService
      .addEndorsement(this.endorsement)
      .subscribe(() => {
        this.dialogRef.close();
        this.endorsementService.fireUpdateEndorsementsEvent();
      });
  }

  ngOnInit() {
    this.categories = this.categoryService.getCategories().share();
    this.employees = this.employeeService.getAllEmployees().share();
  }

}

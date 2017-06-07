import { Router } from '@angular/router';
import { Account } from '../../../models/account';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Rx';

import { ListboxModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/components/common/api';
import { CategoryService } from '../../../services/category.service';
import { EmployeeService } from '../../../services/employee.service';
import { EndorsementService } from '../../../services/prestige.service';
import { Endorsement } from '../../../models/endorsement';

@Component({
  selector: 'app-add-endorsement',
  templateUrl: './add-endorsement.component.html',
  styleUrls: ['./add-endorsement.component.scss']
})

export class AddEndorsementComponent implements OnInit {

  public categories: Observable<string[]>;
  public employees: Observable<Account[]>;
  prestige: Endorsement = new Endorsement();

  constructor(public dialogRef: MdDialogRef<any>,
    private router: Router,
    private categoryService: CategoryService,
    private employeeService: EmployeeService,
    private prestigeService: EndorsementService) {
  }

  addPrestige() {
    this.prestigeService
      .addPrestige(this.prestige)
      .subscribe(() => {
        this.dialogRef.close();
        this.prestigeService.fireUpdateEndorsementsEvent();
      });
  }

  ngOnInit() {
    this.categories = this.categoryService.getCategories().share();
    this.employees = this.employeeService.getAllEmployees().share();
  }

}

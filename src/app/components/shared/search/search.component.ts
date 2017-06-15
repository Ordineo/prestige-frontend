import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Account } from '../../../models/account';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchTextControl: FormControl = new FormControl();
  public employees: Account[] = [];
  public filteredOptions: Observable<Account[]>;

  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  ngOnInit() {
    this.employeeService
      .getAllEmployees()
      .subscribe((employees: Account[]) => {
        this.employees = employees;
      });

    this.filteredOptions = this.searchTextControl.valueChanges
      .startWith(null)
      .map(text => {
        return text && text.trim().length > 0 ? this.filter(text) : [];
      });
  }

  public filter(filterText: string) {
    return this.employees
      .filter(employee =>
      `${employee.firstName} ${employee.lastName} ${employee.username}`.toLowerCase()
        .indexOf(filterText.toLowerCase()) > -1);
  }

  public showEmployeeDetail(employee: Account) {
    this.router.navigate(['/employee-detail', employee.username])
      .then(() => this.searchTextControl.reset());
  }
}

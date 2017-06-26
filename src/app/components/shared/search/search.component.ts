import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
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
  public filteredOptions: Observable<Account[]>;
  private inputTimer: Observable<number>;
  private inputTimerSubscription: Subscription;

  constructor(private employeeService: EmployeeService,
    private router: Router) {
  }

  ngOnInit() {
    this.filteredOptions = this.searchTextControl
      .valueChanges
      .debounceTime(400)
      .flatMap(text => this.employeeService.searchEmployees({ username: text, firstName: '', lastName: '' }));
  }

  public showEmployeeDetail(employee: Account) {
    this.router.navigate(['/employee-detail', employee.username])
      .then(() => this.searchTextControl.reset());
  }
}

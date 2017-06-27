import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Account } from '../../../models/account';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-search-employees',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss']
})
export class EmployeeSearchComponent implements OnInit {

  public searchTextControl: FormControl = new FormControl();
  public filteredOptions: Observable<Account[]>;
  @Input() public onEmployeeSelect: (employee: Account) => {};

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.filteredOptions = this.searchTextControl
      .valueChanges
      .debounceTime(400)
      .flatMap(text => this.employeeService.searchEmployees({username: text, firstName: '', lastName: ''}));
  }

  reset() {
    this.searchTextControl.reset();
  }
}
